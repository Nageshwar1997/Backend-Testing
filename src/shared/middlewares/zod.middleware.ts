import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import { sharedUtils } from "@/shared/utils";
import { sharedClasses } from "@/shared/classes";

export const zodMiddleware =
  <T extends ZodObject<any>>(schema: T) =>
  (req: Request, _: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body ?? {});

    if (!result.success) {
      const errors = result.error.issues.map((err) => ({
        field: err.path.join("."), // nested path support
        message: err.message,
      }));

      const { fieldErrors, globalErrors } = sharedUtils.segregateErrors(errors);
      return next(
        new sharedClasses.AppError({
          message: "Validation Error",
          statusCode: 400,
          code: "VALIDATION_ERROR",
          fieldErrors,
          globalErrors,
        }),
      );
    }

    req.body = result.data;
    next();
  };
