import { chatbotSockets } from "./sockets";

export * as TChatbotModule from "./types";

export const chatbotModule = {
  sockets: chatbotSockets,
};
