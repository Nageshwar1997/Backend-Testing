/* ============================ Error Types Start ============================ */

import { TUserModule } from "@/modules/user";
import { Request } from "express";
import multer, { MulterError } from "multer";

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
  fieldsConfig?: {
    name: string;
    maxCount: number;
  }[];
  limits?: multer.Options["limits"];
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

export type TAuthProvider = "GOOGLE" | "MANUAL" | "LINKEDIN" | "GITHUB";

export interface AuthRequest extends Request {
  user?: TUserModule.IUser; // User object without password
}

/* ============================ Auth Types End ============================ */

/* ====================================== || ====================================== */

/* ============================ User Types Start ============================ */

export type TRole = "USER" | "SELLER" | "ADMIN" | "MASTER";

/* ============================ User Types End ============================ */

/* ====================================== || ====================================== */

/* ============================ Zod Types Start ============================ */

type TZodCompareConfigs = { min?: number; max?: number };
type TZodRegex = { regex: RegExp; message: string };

type TZodCommonBaseConfigs = {
  field: string;
  parentField?: string;
  label: string;
  parentLabel?: string;
};

export interface IZodStringConfigs
  extends TZodCommonBaseConfigs, TZodCompareConfigs {
  allowSpace?: "noSpace" | "singleSpace" | "anySpace";
  nonEmpty?: boolean;
  customRegexes?: TZodRegex[];
  customRegex?: TZodRegex;
  lowerOrUpper?: "upper" | "lower";
}

export interface IZodNumberConfigs
  extends TZodCommonBaseConfigs, TZodCompareConfigs {
  isInt?: boolean;
  isPositive?: boolean;
  isNegative?: boolean;
}

export interface IZodEnumsConfigs extends TZodCommonBaseConfigs {
  enumValues: readonly string[];
}

/* ============================ Zod Types End ============================ */

/* ====================================== || ====================================== */

export * as TSharedInternal from ".";
