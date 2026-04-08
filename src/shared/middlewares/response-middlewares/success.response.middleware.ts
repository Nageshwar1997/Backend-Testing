import { sharedClasses } from "@/shared/classes";
import { NextFunction, Request, Response } from "express";

declare module "express-serve-static-core" {
  interface Response {
    success: (statusCode: number, message: string, data?: object) => void;
  }
  interface Request {
    requestId?: string;
  }
}

export const successResponse = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.success = (statusCode: number, message: string, data: object = {}) => {
    const response = new sharedClasses.AppSuccess(statusCode, message, data);

    res.status(statusCode).json({
      success: true,
      error: false,
      requestId: req.requestId,
      ...response,
    });
  };

  next();
};
