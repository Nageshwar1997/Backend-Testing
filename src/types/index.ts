import { IUser } from "@/modules/user/types";
import { Request } from "express";
import { Types } from "mongoose";
import { MulterError, Options } from "multer";

/* ============================ Error Types Start ============================ */

type TErrorCode =
  | "VALIDATION_ERROR"
  | "AUTH_ERROR"
  | "NOT_FOUND"
  | "UPLOAD_ERROR"
  | "INTERNAL_ERROR";

export type TFieldErrors = Record<string, string[]>;

export type TErrorPayload = {
  fieldErrors: TFieldErrors;
  globalErrors: string[];
};

export interface IAppError extends Partial<TErrorPayload> {
  message: string;
  statusCode: number;
  code?: TErrorCode;
  isOperational?: boolean;
}

type TMediaKey = "IMAGE" | "VIDEO" | "OTHER";

type TCommonMulterFileConfigs = {
  format?: Partial<Record<TMediaKey, string[]>>;
  size?: Partial<Record<TMediaKey, number>>;
};

export interface IMulterValidation extends TCommonMulterFileConfigs {
  type: "single" | "array" | "any" | "fields" | "none";
  fieldName?: string;
  maxCount?: number;
  fieldsConfig?: { name: string; maxCount: number }[];
  limits?: Options["limits"];
}

export interface IMulterCustomError extends TCommonMulterFileConfigs {
  files: Express.Multer.File[];
}
export interface IMulterDefaultError extends Pick<
  IMulterValidation,
  "fieldName" | "maxCount"
> {
  err?: MulterError | Error;
}

/* ============================ Error Types End ============================ */

/* ====================================== || ====================================== */

/* ============================ Auth Types Start ============================ */

export interface AuthRequest extends Request {
  user?: IUser;
}

/* ============================ Auth Types End ============================ */

/* ====================================== || ====================================== */

/* ============================ User Types Start ============================ */

/* ============================ User Types End ============================ */

/* ====================================== || ====================================== */

/* ============================ Common Types Start ============================ */

export type _ID = Types.ObjectId;

export type TId = { _id: _ID };
export type TTimestamp = { createdAt: Date; updatedAt: Date };

/* ============================ Common Types End ============================ */

/* ====================================== || ====================================== */
