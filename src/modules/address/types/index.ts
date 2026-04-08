import { Types } from "mongoose";
import { TUserModule } from "@/modules/user";
import { shared } from "@/shared";

export type TAddress = Pick<
  TUserModule.IUser,
  "firstName" | "lastName" | "email" | "phoneNumber"
> & {
  user: Types.ObjectId;
  altPhoneNumber?: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pinCode: string;
  country: (typeof shared.constants.ALLOWED_COUNTRIES)[number];
  gst?: string;
  type: (typeof shared.constants.ADDRESS_TYPES)[number];
};
export interface IAddress extends Document, TAddress {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export * as TAddressInternal from ".";
