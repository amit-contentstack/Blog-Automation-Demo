import client from "../utils/contentstack-management-sdk";
import { SocialMediaPost } from "../types/entries";

export const createSocialPost = async (postEntry: SocialMediaPost) => {
  console.log("Creating social post entry", postEntry);
  const response = await client
    .contentType("social_media_post")
    .entry()
    .create({ entry: postEntry });

  return response;
};
