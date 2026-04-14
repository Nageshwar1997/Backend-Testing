import { NextFunction, Request, Response } from "express";
import { schemaValidator } from "@beautinique/be-zod";
import { AppError } from "@beautinique/be-classes";
import { segregateErrors } from "@/utils";

export const validateSchema =
  <T extends Parameters<typeof schemaValidator>[0]>(schema: T) =>
  (req: Request, _: Response, next: NextFunction) => {
    const result = schemaValidator(schema, req.body ?? {});

    if (!result.success) {
      const errors = result.error.issues.map((err) => ({
        field: err.path.join("."), // nested path support
        message: err.message,
      }));

      const { fieldErrors, globalErrors } = segregateErrors(errors);
      return next(
        new AppError({
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
