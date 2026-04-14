import {
  MulterMiddleware,
  RequestMiddleware,
  ResponseMiddleware,
  ZodMiddleware,
} from "@/middlewares";
import { Router } from "express";
import {
  registerResendOtpController,
  registerSendOtpController,
  registerVerifyOtpController,
} from "../../controllers";
import { registerEmailSchema, registerSchema } from "@beautinique/be-zod";

export const registerRouter = Router();

registerRouter.post(
  "/send-otp",
  RequestMiddleware.emptyRequest({ body: true }),
  ZodMiddleware.validateSchema(registerEmailSchema),
  ResponseMiddleware.tryCatchResponse(registerSendOtpController),
);

registerRouter.post(
  "/resend-otp",
  RequestMiddleware.emptyRequest({ body: true }),
  ZodMiddleware.validateSchema(registerEmailSchema),
  ResponseMiddleware.tryCatchResponse(registerResendOtpController),
);

registerRouter.post(
  "/verify-otp",
  MulterMiddleware.validateMulter({ type: "single", fieldName: "profilePic" }),
  RequestMiddleware.emptyRequest({
    file: false,
    body: true,
    query: true,
  }),
  ZodMiddleware.validateSchema(registerSchema),
  ResponseMiddleware.tryCatchResponse(registerVerifyOtpController),
);
