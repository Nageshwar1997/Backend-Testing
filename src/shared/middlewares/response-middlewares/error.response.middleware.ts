import { NextFunction, Request, Response } from "express";
import { Error as MongooseError } from "mongoose";

import { sharedClasses } from "@/shared/classes";
import { sharedUtils } from "@/shared/utils";
import { envs } from "@/shared/envs";

const baseResponse = { success: false, error: true };

export const errorResponse = (
  err: Error | InstanceType<typeof sharedClasses.AppError> | MongooseError,
  req: Request,
  res: Response,
  _: NextFunction,
) => {
  let error: InstanceType<typeof sharedClasses.AppError>;

  if (err instanceof MongooseError.ValidationError) {
    const rawErrors = Object.entries(err.errors).map(([field, errorObj]) => ({
      field,
      message: errorObj.message,
    }));

    const { fieldErrors, globalErrors } =
      sharedUtils.segregateErrors(rawErrors);

    error = new sharedClasses.AppError({
      message: "Validation Error",
      statusCode: 400,
      code: "VALIDATION_ERROR",
      fieldErrors,
      globalErrors,
    });
  } else if (err instanceof sharedClasses.AppError) {
    error = err;
  } else {
    error = new sharedClasses.AppError({
      message: envs.is_dev_mode
        ? err?.message || "Internal Server Error"
        : "Something went wrong!",
      statusCode: 500,
      code: "INTERNAL_ERROR",
      isOperational: false,
    });
  }

  return res.status(error.statusCode).json({
    ...baseResponse,
    message: error.message,
    code: error.code,
    fieldErrors: error.fieldErrors || [],
    globalErrors: error.globalErrors || [],
    statusCode: error.statusCode,
    requestId: req.requestId,
    ...(envs.is_dev_mode && { stack: error.stack }),
  });
};
