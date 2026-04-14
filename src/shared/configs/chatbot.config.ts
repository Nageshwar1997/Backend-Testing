import { MistralAIEmbeddings } from "@langchain/mistralai";
import { envs } from "../../envs";

const embedding = (apiKey: string) => {
  return new MistralAIEmbeddings({ apiKey, model: "mistral-embed" });
};

export const chatbotConfig = {
  post: embedding(envs.mitral.api_key_post),
  get: embedding(envs.mitral.api_key_get),
};
