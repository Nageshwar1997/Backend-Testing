import { envs } from "@/envs";
import { MistralAIEmbeddings } from "@langchain/mistralai";

const embedding = (apiKey: string) => {
  return new MistralAIEmbeddings({ apiKey, model: "mistral-embed" });
};

export const chatbotConfig = {
  post: embedding(envs.mitral.api_key_post),
  get: embedding(envs.mitral.api_key_get),
};
