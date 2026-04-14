import { Types } from "mongoose";
import { TUserModule } from "@/modules/user";
import { TAddressType, TCountry } from "@beautinique/be-constants";

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
  country: TCountry;
  gst?: string;
  type: TAddressType;
};
export interface IAddress extends Document, TAddress {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export * as TAddressInternal from ".";
