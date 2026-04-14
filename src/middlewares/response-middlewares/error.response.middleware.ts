import { NextFunction, Request, Response } from "express";
import { Error as MongooseError } from "mongoose";

import { envs } from "@/envs";
import { AppError } from "@/classes";
import { segregateErrors } from "@/utils";

const baseResponse = { success: false, error: true };

export const errorResponse = (
  err: Error | InstanceType<typeof AppError> | MongooseError,
  req: Request,
  res: Response,
  _: NextFunction,
) => {
  let error: InstanceType<typeof AppError>;

  if (err instanceof MongooseError.ValidationError) {
    const rawErrors = Object.entries(err.errors).map(([field, errorObj]) => ({
      field,
      message: errorObj.message,
    }));

    const { fieldErrors, globalErrors } = segregateErrors(rawErrors);

    error = new AppError({
      message: "Validation Error",
      statusCode: 400,
      code: "VALIDATION_ERROR",
      fieldErrors,
      globalErrors,
    });
  } else if (err instanceof AppError) {
    error = err;
  } else {
    error = new AppError({
      message: envs.is_dev
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
    ...(envs.is_dev && { stack: error.stack }),
  });
};
