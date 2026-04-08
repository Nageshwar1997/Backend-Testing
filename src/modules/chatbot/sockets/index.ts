import { initOrderSocket } from "./order";
import { initProductSocket } from "./product";

export const chatbotSockets = {
  product: initProductSocket,
  order: initOrderSocket,
};
