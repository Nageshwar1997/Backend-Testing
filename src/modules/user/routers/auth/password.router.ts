import { RequestMiddleware, ResponseMiddleware } from "@/middlewares";
import { Router } from "express";
import {
  forgotPasswordSendLinkAndOtpController,
  forgotPasswordResendLinkAndOtpController,
  forgotPasswordVerifyOtpController,
  forgotPasswordValidateTokenController,
  forgotPasswordSetPasswordController,
} from "../../controllers";

export const passwordRouter = Router();

passwordRouter.post(
  "/forgot-password-send-link-and-otp",
  ResponseMiddleware.tryCatchResponse(forgotPasswordSendLinkAndOtpController),
);

passwordRouter.post(
  "/forgot-password-resend-link-and-otp",
  ResponseMiddleware.tryCatchResponse(forgotPasswordResendLinkAndOtpController),
);

passwordRouter.post(
  "/forgot-password-verify-otp",
  RequestMiddleware.emptyRequest({ body: true }),
  ResponseMiddleware.tryCatchResponse(forgotPasswordVerifyOtpController),
);

passwordRouter.get(
  "/forgot-password-validate-token",
  ResponseMiddleware.tryCatchResponse(forgotPasswordValidateTokenController),
);

passwordRouter.patch(
  "/forgot-password-set-password",
  RequestMiddleware.emptyRequest({ body: true }),
  ResponseMiddleware.tryCatchResponse(forgotPasswordSetPasswordController),
);
