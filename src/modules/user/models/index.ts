import { model } from "mongoose";
import { userModuleSchemas } from "../schemas";
import { TUserModuleInternal } from "../types";

export const User = model<TUserModuleInternal.IUser>(
  "User",
  userModuleSchemas.user,
);

export const Seller = model<TUserModuleInternal.ISeller>(
  "Seller",
  userModuleSchemas.seller,
);

export const Wishlist = model<TUserModuleInternal.IWishlist>(
  "Wishlist",
  userModuleSchemas.wishlist,
);

export const userModuleModels = { User, Seller, Wishlist };
