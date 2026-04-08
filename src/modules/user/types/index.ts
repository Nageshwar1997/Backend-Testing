import { TAddressModule } from "@/modules/address";
import { TShared } from "@/shared";
import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: TShared.TRole;
  providers: TShared.TAuthProvider[];
  profilePic?: string;
  createdAt: Date;
  updatedAt: Date;
}

type TBaseSeller = Pick<IUser, "email" | "phoneNumber"> & {
  name: string;
};

export type TSeller = {
  user: Types.ObjectId;
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
  personalDetails: TBaseSeller;
  businessDetails: TBaseSeller & { category: string };
  requiredDocuments: {
    gst: string;
    itr: string;
    addressProof: string;
    geoTagging: string;
  };
  businessAddress: Pick<
    TAddressModule.TAddress,
    "address" | "landmark" | "city" | "state" | "pinCode" | "country"
  > & { gst: string; pan: string };
};

export interface ISeller extends Document, TSeller {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWishlist {
  _id: Types.ObjectId;
  products: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export * as TUserModuleInternal from ".";
