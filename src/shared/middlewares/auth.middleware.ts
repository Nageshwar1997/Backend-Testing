import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { TSharedInternal } from "../types";
import { sharedClasses } from "../classes";
import { sharedUtils } from "../utils";
import { userModule } from "@/modules/user";
import { envs } from "../envs";

const getUserIdFromToken = (req: Request) => {
  try {
    const token = req.get("Authorization");

    if (!token) {
      throw new sharedClasses.AppError({
        message: "You are not authenticated, please login",
        statusCode: 401,
        code: "AUTH_ERROR",
      });
    }

    const tokenWithoutBearer = sharedUtils.getAuthorizationToken(token);

    const decoded = jwt.verify(
      tokenWithoutBearer,
      envs.jwt_secret,
    ) as JwtPayload & { userId: string };

    if (!decoded) {
      throw new sharedClasses.AppError({
        message: "Invalid token",
        statusCode: 401,
        code: "AUTH_ERROR",
      });
    } else if (!decoded.userId) {
      throw new sharedClasses.AppError({
        message: "UserId not found",
        statusCode: 404,
        code: "NOT_FOUND",
      });
    }

    return decoded.userId;
  } catch (error) {
    const { TokenExpiredError, JsonWebTokenError, NotBeforeError } = jwt;

    const errInstance =
      error instanceof
      (TokenExpiredError || JsonWebTokenError || NotBeforeError);

    if (errInstance) {
      const { name, message } = error;
      const comMsg = "Please login again.";
      let errorMessage = "";

      switch (name) {
        case "TokenExpiredError":
        case "JsonWebTokenError":
        case "NotBeforeError":
          errorMessage = `${message}, ${comMsg}`;
          break;
        default:
          errorMessage = `Token error: ${message}, ${comMsg}`;
          break;
      }
      throw new sharedClasses.AppError({
        message: errorMessage,
        statusCode: 401,
        code: "AUTH_ERROR",
      });
    }
    throw error;
  }
};

const authenticated =
  (needPassword?: boolean) =>
  async (req: TSharedInternal.AuthRequest, _: Response, next: NextFunction) => {
    try {
      const userId = getUserIdFromToken(req);

      const user = await userModule.services.get.user_by_id({
        id: userId,
        lean: true,
        password: needPassword,
      });

      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  };

const authorized =
  (allowedRoles: TSharedInternal.TRole[], needPassword?: boolean) =>
  async (req: TSharedInternal.AuthRequest, _: Response, next: NextFunction) => {
    try {
      const userId = getUserIdFromToken(req);

      sharedUtils.isValidMongoId(userId, "Invalid userId", 400);

      const user = await userModule.services.get.user_by_id({
        id: userId,
        lean: true,
        password: needPassword,
      });

      if (!allowedRoles.includes(user.role)) {
        throw new sharedClasses.AppError({
          message: "Unauthorized",
          statusCode: 401,
          code: "AUTH_ERROR",
        });
      }

      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  };

export const authMiddleware = { authenticated, authorized };
