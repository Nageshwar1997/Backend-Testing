import { TProductModule } from "@/modules/product";
import { _ID, TId } from "@/types";

export type TCartProduct = TId & {
  cart: _ID;
  product: _ID;
  shade?: _ID | null;
  quantity: number;
};

export interface IPopulatedCartProduct extends Omit<
  TCartProduct,
  "product" | "shade"
> {
  product: TProductModule.IProduct;
  shade?: TProductModule.IShade | null;
}
