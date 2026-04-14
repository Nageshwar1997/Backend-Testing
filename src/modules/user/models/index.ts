import { model } from "mongoose";
import { sellerSchema, userSchema, wishlistSchema } from "../schemas";
import { ISeller, IUser, IWishlist } from "../types";

export const User = model<IUser>("User", userSchema);

export const Seller = model<ISeller>("Seller", sellerSchema);

export const Wishlist = model<IWishlist>("Wishlist", wishlistSchema);
