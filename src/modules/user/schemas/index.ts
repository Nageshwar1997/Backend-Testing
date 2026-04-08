import { Schema } from "mongoose";
import { shared } from "@/shared";
import { TUserModuleInternal } from "../types";

export const userSchema = new Schema<TUserModuleInternal.IUser>(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    profilePic: { type: String, default: "", trim: true },
    role: { type: String, enum: shared.constants.ROLES, default: "USER" },
    password: { type: String, trim: true },
    providers: { type: [String], default: ["MANUAL"] },
  },
  { versionKey: false, timestamps: true },
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index(
  { phoneNumber: 1 },
  { unique: true, partialFilterExpression: { phoneNumber: { $ne: "" } } },
);
userSchema.index({ role: 1 });

const businessAddressSchema = new Schema<
  TUserModuleInternal.ISeller["businessAddress"]
>(
  {
    address: { type: String, required: true, minlength: 3 },
    landmark: { type: String, default: "" },
    city: { type: String, required: true, minlength: 2 },
    state: {
      type: String,
      required: true,
      enum: shared.constants.STATES_AND_UNION_TERRITORIES,
    },
    pinCode: { type: String, required: true, minlength: 6, maxlength: 6 },
    country: {
      type: String,
      required: true,
      enum: shared.constants.ALLOWED_COUNTRIES,
      default: "India",
    },
    pan: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
      uppercase: true,
    },
    gst: {
      type: String,
      required: true,
      minlength: 15,
      maxlength: 15,
      uppercase: true,
    },
  },
  { versionKey: false, _id: false },
);

const personalDetailsSchema = new Schema<
  TUserModuleInternal.ISeller["personalDetails"]
>(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 50 },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true, minlength: 10, maxlength: 10 },
  },
  { versionKey: false, _id: false },
);

const businessDetailsSchema = new Schema<
  TUserModuleInternal.ISeller["businessDetails"]
>(
  {
    name: { type: String, required: true, minlength: 2 },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true, minlength: 10, maxlength: 10 },
    category: {
      type: String,
      required: true,
      enum: shared.constants.ALLOWED_BUSINESSES,
    },
  },
  { versionKey: false, _id: false },
);

const requiredDocumentsSchema = new Schema<
  TUserModuleInternal.ISeller["requiredDocuments"]
>(
  {
    gst: { type: String, required: true },
    itr: { type: String, required: true },
    geoTagging: { type: String, required: true },
    addressProof: { type: String, required: true },
  },
  { versionKey: false, _id: false },
);

export const sellerSchema = new Schema<TUserModuleInternal.ISeller>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    businessAddress: businessAddressSchema,
    personalDetails: personalDetailsSchema,
    businessDetails: businessDetailsSchema,
    requiredDocuments: requiredDocumentsSchema,
    approvalStatus: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { versionKey: false, timestamps: true },
);

export const wishlistSchema = new Schema<TUserModuleInternal.IWishlist>(
  {
    _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { versionKey: false, timestamps: true },
);

export const userModuleSchemas = {
  user: userSchema,
  seller: sellerSchema,
  wishlist: wishlistSchema,
};
