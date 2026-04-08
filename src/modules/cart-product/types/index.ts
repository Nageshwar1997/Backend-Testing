import { Types } from "mongoose";
import { TProductModule } from "@/modules/product";

export type TCartProduct = {
  _id: Types.ObjectId;
  cart: Types.ObjectId;
  product: Types.ObjectId;
  shade?: Types.ObjectId;
  quantity: number;
};

export interface IPopulatedCartProduct extends Omit<
  TCartProduct,
  "product" | "shade"
> {
  product: TProductModule.IProduct;
  shade?: TProductModule.IShade | null;
}
