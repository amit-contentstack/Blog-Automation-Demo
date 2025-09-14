import * as contentstack from "@contentstack/management";

const client = contentstack.client().stack({
  api_key: process.env.CONTENTSTACK_API_KEY || "",
  management_token: process.env.CONTENTSTACK_MANAGEMENT_TOKEN || "",
});

export default client;
