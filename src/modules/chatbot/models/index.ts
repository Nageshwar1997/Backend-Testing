import { model } from "mongoose";
import { chatbotModuleSchemas } from "../schemas";

export const EmbeddedProduct = model(
  "Embedded-Product",
  chatbotModuleSchemas.embeddedProduct,
);

export const EmbeddedOrder = model(
  "Embedded-Order",
  chatbotModuleSchemas.embeddedOrder,
);

export const chatbotModuleModels = {
  EmbeddedProduct,
  EmbeddedOrder,
};
