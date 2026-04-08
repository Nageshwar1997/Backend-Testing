import { Document } from "mongoose";
import { Types } from "mongoose";

export type CategoryTree = {
  _id: Types.ObjectId;
  name: string;
  category: string;
  level: number;
  parentCategory?: CategoryTree;
};

export type TProduct = {
  title: string;
  brand: string;
  originalPrice: number;
  sellingPrice: number;
  totalStock: number;
  description: string;
  howToUse: string;
  ingredients: string;
  additionalDetails: string;
  commonImages: string[];
  shades: Types.ObjectId[];
  category: Types.ObjectId;
  seller: Types.ObjectId;
  reviews: Types.ObjectId[];
  rating: number;
};

export interface IProduct extends Document, TProduct {
  _id: Types.ObjectId;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
  totalSales: number;
}

export interface IShade extends Document {
  _id: Types.ObjectId;
  colorCode: string;
  shadeName: string;
  images: string[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TPopulatedProduct extends Omit<
  TProduct,
  "category" | "shades"
> {
  category: CategoryTree;
  shades: IShade[];
}

export * as TProductModuleInternal from ".";
