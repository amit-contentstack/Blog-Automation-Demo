import { tool } from "@langchain/core/tools";
import { z } from "zod";
import axios from "axios";

const createMediaContainer = async (imageUrl: string, caption: string) => {
  try {
    console.log("URL: ", `${process.env.META_URL}/${process.env.IG_APP_ID}/media`);
    console.log("PAYLOAD: ", {
      image_url: imageUrl,
      caption: caption,
      access_token: process.env.IG_TOKEN,
    });
    const response = await axios.post(
      `${process.env.META_URL}/${process.env.IG_APP_ID}/media`,
      {
        image_url: imageUrl,
        caption: caption,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.IG_TOKEN}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating media container", error);
    throw error;
  }
};

const publishMediaContainer = async (mediaContainerId: string) => {
  try {
    const response = await axios.post(
      `${process.env.META_URL}/${process.env.IG_APP_ID}/media_publish/`,
      {
        creation_id: mediaContainerId,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.IG_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error publishing media container", error);
    throw error;
  }
};

const publishPostOnInstagram = async (imageUrl: string, caption: string) => {
  console.log("Publishing post on Instagram", imageUrl, caption);
  try {
    const mediaContainerId = await createMediaContainer(imageUrl, caption);
    console.log("Media container created", mediaContainerId);
    const response = await publishMediaContainer(mediaContainerId?.id);
    console.log(response.data);
    return { message: "Post published on Instagram" };
  } catch (error) {
    console.error("Error creating post on Facebook", error);
    throw error;
  }
};

const createPostOnFacebook = async (imageUrl: string, caption: string) => {
  console.log("Creating post on Facebook", imageUrl, caption);
  try {
    const response = await axios.post(`${process.env.META_URL}/${process.env.FB_PAGE_ID}/photos`, {
      url: imageUrl,
      message: caption,
      access_token: process.env.FB_TOKEN,
    });
    console.log(response.data);
    return { message: "Post published on Facebook" };
  } catch (error) {
    console.error("Error creating post on Facebook", error);
    throw error;
  }
};

// LangChain Tool: Publish Post on Instagram
const publishPostOnInstagramTool = tool(
  async (input: { imageUrl: string; caption: string }) => {
    return await publishPostOnInstagram(input.imageUrl, input.caption);
  },
  {
    name: "publishPostOnInstagram",
    schema: z.object({
      imageUrl: z.string().describe("The URL of the image to be posted to Instagram"),
      caption: z.string().describe("The caption text for the Instagram post"),
    }),
    description: "Publishes a post on Instagram.",
  }
);

const createPostOnFacebookTool = tool(
  async (input: { imageUrl: string; caption: string }) => {
    return await createPostOnFacebook(input.imageUrl, input.caption);
  },
  {
    name: "createPostOnFacebook",
    schema: z.object({
      imageUrl: z.string().describe("The URL of the image to be posted to Facebook"),
      caption: z.string().describe("The caption text for the Facebook post"),
    }),
    description: "Creates/Publishes a post on Facebook.",
  }
);

const tools = [publishPostOnInstagramTool, createPostOnFacebookTool];

const toolsByName = Object.fromEntries(tools.map((tool) => [tool.name, tool]));

export { tools, toolsByName };
