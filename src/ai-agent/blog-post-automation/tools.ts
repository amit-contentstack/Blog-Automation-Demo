import { tool } from "@langchain/core/tools";
import { z } from "zod";
import axios from "axios";
import { createSocialPost } from "@/services/social-media-post";

// Utility function to safely stringify objects with circular references
const safeStringify = (obj: any): string => {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return "[Circular Reference]";
      }
      seen.add(value);
    }
    return value;
  });
};

const createMediaContainer = async (imageUrl: string, caption: string) => {
  try {
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
    // console.log(response.data);
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

const publishPostOnInstagram = async (
  imageUrl: string,
  caption: string,
  blogId: string,
  blogTitle: string
) => {
  console.log("Publishing post on Instagram");
  try {
    const mediaContainerId = await createMediaContainer(imageUrl, caption);
    const response = await publishMediaContainer(mediaContainerId?.id);

    await createSocialPost({
      title: `${blogTitle} on Instagram`,
      blog_id: [{ uid: blogId, _content_type_uid: "blog" }],
      platform_name: "Instagram",
      post_content: caption,
      post_detail_json: safeStringify({ ...response }),
    });
    // console.log(response.data);
    console.log("Post published on Instagram");
    return { message: "Post published on Instagram" };
  } catch (error) {
    console.error("Error creating post on Facebook", error);
    throw error;
  }
};

const createPostOnFacebook = async (
  imageUrl: string,
  caption: string,
  blogId: string,
  blogTitle: string
) => {
  console.log("Creating post on Facebook");
  try {
    const response = await axios.post(`${process.env.META_URL}/${process.env.FB_PAGE_ID}/photos`, {
      url: imageUrl,
      message: caption,
      access_token: process.env.FB_TOKEN,
    });
    // console.log(response.data);
    await createSocialPost({
      title: `${blogTitle} on Facebook`,
      blog_id: [{ uid: blogId, _content_type_uid: "blog" }],
      platform_name: "Facebook",
      post_content: caption,
      post_detail_json: safeStringify({ ...response }),
    });
    console.log("Post published on Facebook");
    return { message: "Post published on Facebook" };
  } catch (error) {
    console.error("Error creating post on Facebook", error);
    throw error;
  }
};

// LangChain Tool: Publish Post on Instagram
const publishPostOnInstagramTool = tool(
  async (input: { imageUrl: string; caption: string; blogId: string; blogTitle: string }) => {
    return await publishPostOnInstagram(
      input.imageUrl,
      input.caption,
      input.blogId,
      input.blogTitle
    );
  },
  {
    name: "publishPostOnInstagram",
    schema: z.object({
      blogId: z.string().describe("The ID of the blog to be posted to Instagram"),
      imageUrl: z.string().describe("The URL of the image to be posted to Instagram"),
      caption: z.string().describe("The caption text for the Instagram post"),
      blogTitle: z.string().describe("The title of the blog to be posted to Instagram"),
    }),
    description: "Publishes a post on Instagram.",
  }
);

const createPostOnFacebookTool = tool(
  async (input: { imageUrl: string; caption: string; blogId: string; blogTitle: string }) => {
    return await createPostOnFacebook(input.imageUrl, input.caption, input.blogId, input.blogTitle);
  },
  {
    name: "createPostOnFacebook",
    schema: z.object({
      blogId: z.string().describe("The ID of the blog to be posted to Facebook"),
      imageUrl: z.string().describe("The URL of the image to be posted to Facebook"),
      caption: z.string().describe("The caption text for the Facebook post"),
      blogTitle: z.string().describe("The title of the blog to be posted to Facebook"),
    }),
    description: "Creates/Publishes a post on Facebook.",
  }
);

const tools = [publishPostOnInstagramTool, createPostOnFacebookTool];

const toolsByName = Object.fromEntries(tools.map((tool) => [tool.name, tool]));

export { tools, toolsByName };
