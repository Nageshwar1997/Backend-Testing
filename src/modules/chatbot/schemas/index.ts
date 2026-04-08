import { Schema } from "mongoose";
import { TChatbotModuleInternal } from "../types";

const embeddedProductSchema =
  new Schema<TChatbotModuleInternal.IEmbeddedProduct>(
    {
      embeddings: { type: [Number], required: true },
      searchText: { type: String, required: true },
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    },
    { versionKey: false },
  );

const embeddedOrderSchema = new Schema<TChatbotModuleInternal.IEmbeddedOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    embeddings: { type: [Number], required: true },
    searchText: { type: String, required: true },
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  },
  { versionKey: false },
);

embeddedOrderSchema.index({ user: 1 });

export const chatbotModuleSchemas = {
  embeddedProduct: embeddedProductSchema,
  embeddedOrder: embeddedOrderSchema,
};
