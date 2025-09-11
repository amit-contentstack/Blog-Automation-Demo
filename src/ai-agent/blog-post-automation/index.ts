"use server";

import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { AIMessage } from "@langchain/core/messages";
import { Blog } from "@/types/entries";
import { tools } from "./tools";
import { SYSTEM_PROMPT } from "./prompt";

const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4o-mini",
  temperature: 0,
});

const llmWithTools = llm.bindTools(tools);

// NODE
async function llmCall(state: typeof MessagesAnnotation.State) {
  const result = await llmWithTools.invoke([
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
    ...state.messages,
  ]);

  return {
    messages: [result],
  };
}

const toolNode = new ToolNode(tools);

// Conditional edge function to route to the tool node or end
function shouldContinue(state: typeof MessagesAnnotation.State) {
  const messages = state.messages;
  const lastMessage = messages.at(-1);

  // If the LLM makes a tool call, then perform an action
  if (lastMessage instanceof AIMessage && lastMessage.tool_calls?.length) {
    return "Action";
  }
  // Otherwise, we stop (reply to the user)
  return "__end__";
}

const agentBuilder = new StateGraph(MessagesAnnotation)
  .addNode("llmCall", llmCall)
  .addNode("tools", toolNode)
  // Add edges to connect nodes
  .addEdge("__start__", "llmCall")
  .addConditionalEdges("llmCall", shouldContinue, {
    // Name returned by shouldContinue : Name of next node to visit
    Action: "tools",
    __end__: "__end__",
  })
  .addEdge("tools", "llmCall")
  .compile();

export default async function blogPostAutomation(blogData: Blog) {
  try {
    const messages = [
      {
        role: "user",
        content: `Please generate and publish social media content for the following blog:

Blog Title: ${blogData.title}
Blog Description: ${blogData.description}
Blog Content: ${
          typeof blogData.blog_content === "string"
            ? blogData.blog_content
            : JSON.stringify(blogData.blog_content)
        }
Blog Image URL: ${blogData.feature_image.url}
Blog URL: ${blogData.url}
Selected Platforms: ${
          blogData.platforms_to_post
            ? JSON.stringify(blogData.platforms_to_post)
            : "both (Instagram and Facebook)"
        }

Please generate appropriate content for the selected platforms and use the publishing tools to post them.`,
      },
    ];
    const result = await agentBuilder.invoke({
      messages,
    });

    return {
      success: true,
      data: {
        message: "Post published successfully!",
      },
    };
  } catch (error) {
    console.error("Error publishing post:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
