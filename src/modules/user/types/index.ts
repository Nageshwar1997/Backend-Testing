import { Document, Types } from "mongoose";
import { TAuthProvider, TRole } from "@beautinique/be-constants";
import { TRegister, TSellerRequest } from "@beautinique/be-zod";

export type _ID = Types.ObjectId;

export type TId = { _id: _ID };
export type TTimestamp = { createdAt: Date; updatedAt: Date };

export interface IUser
  extends
    Omit<TRegister, "otp" | "confirmPassword">,
    TTimestamp,
    TId,
    Document {
  role: TRole;
  providers: TAuthProvider[];
  profilePic?: string;
}

export type TSeller = {
  user: _ID;
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
  personalDetails: Omit<TSellerRequest["businessDetails"], "category">;
  businessDetails: TSellerRequest["businessDetails"];
  requiredDocuments: Record<
    "gst" | "itr" | "addressProof" | "geoTagging",
    string
  >;
  businessAddress: TSellerRequest["businessAddress"];
};

export interface ISeller extends Document, TSeller, TId, TTimestamp {}

export interface IWishlist extends Document, TId, TTimestamp {
  products: Types.ObjectId[];
}
