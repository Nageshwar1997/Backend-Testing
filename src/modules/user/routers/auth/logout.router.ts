import { RequestMiddleware, ResponseMiddleware } from "@/middlewares";
import { Router } from "express";
import { logoutController } from "../../controllers";

export const logoutRouter = Router();

logoutRouter.delete(
  "/logout/:userId",
  RequestMiddleware.emptyRequest({ params: true }),
  ResponseMiddleware.tryCatchResponse(logoutController),
);
