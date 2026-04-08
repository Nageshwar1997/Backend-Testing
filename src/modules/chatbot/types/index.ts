import { TOrderModule } from "@/modules/order";
import { TProductModule } from "@/modules/product";
import { TUserModule } from "@/modules/user";
import { AIMessage, HumanMessage, SystemMessage } from "langchain";
import { ClientSession, Types } from "mongoose";

export type TBaseEmbedded = {
  embeddings: number[];
  searchText: string;
};

export interface IEmbeddedProduct extends TBaseEmbedded {
  product: Types.ObjectId;
}

export interface IEmbeddedOrder extends TBaseEmbedded {
  user: Types.ObjectId;
  order: Types.ObjectId;
}

export interface IAggregatedEmbeddedProduct extends Omit<
  IEmbeddedProduct,
  "product"
> {
  product: Pick<
    TProductModule.IProduct,
    | "title"
    | "brand"
    | "originalPrice"
    | "sellingPrice"
    | "description"
    | "howToUse"
    | "ingredients"
    | "additionalDetails"
    | "_id"
    | "discount"
  > & {
    shades: string[];
    category: Record<"grandParent" | "parent" | "child", string>;
  };
}

export interface IAggregatedEmbeddedOrder extends Omit<
  IEmbeddedOrder,
  "order" | "user"
> {
  user: TUserModule.IUser;
  order: TOrderModule.IOrder;
}

export interface TCreateOrUpdateEmbeddedProduct {
  productId: IAggregatedEmbeddedProduct["product"]["_id"];
  title: IAggregatedEmbeddedProduct["product"]["title"];
  brand: IAggregatedEmbeddedProduct["product"]["brand"];
  category: IAggregatedEmbeddedProduct["product"]["category"];
  session?: ClientSession;
}

type TBaseChatSession = {
  history: (SystemMessage | HumanMessage | AIMessage)[];
  lastQuery?: string;
};

export interface IProductChatSession extends TBaseChatSession {
  lastMatchedProducts?: IAggregatedEmbeddedProduct[];
}

export interface IOrderChatSession extends TBaseChatSession {
  lastMatchedOrders?: IAggregatedEmbeddedOrder[];
}

export * as TChatbotModuleInternal from ".";
