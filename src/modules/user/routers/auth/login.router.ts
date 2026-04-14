import {
  RequestMiddleware,
  ResponseMiddleware,
  ZodMiddleware,
} from "@/middlewares";
import { Router } from "express";
import {
  githubCallbackController,
  githubRedirectController,
  googleCallbackController,
  googleRedirectController,
  linkedinCallbackController,
  linkedinRedirectController,
  manualLoginController,
} from "../../controllers";
import { loginSchema } from "@beautinique/be-zod";

export const loginRouter = Router();

loginRouter.post(
  "/manual",
  RequestMiddleware.emptyRequest({ body: true }),
  ZodMiddleware.validateSchema(loginSchema),
  ResponseMiddleware.tryCatchResponse(manualLoginController),
);

// Google Auth
loginRouter.get(
  "/google",
  ResponseMiddleware.tryCatchResponse(googleRedirectController),
);
loginRouter.get(
  "/google/callback",
  ResponseMiddleware.tryCatchResponse(googleCallbackController),
);

// LinkedIn Auth
loginRouter.get(
  "/linkedin",
  ResponseMiddleware.tryCatchResponse(linkedinRedirectController),
);
loginRouter.get(
  "/linkedin/callback",
  ResponseMiddleware.tryCatchResponse(linkedinCallbackController),
);

// GitHub Auth
loginRouter.get(
  "/github",
  ResponseMiddleware.tryCatchResponse(githubRedirectController),
);
loginRouter.get(
  "/github/callback",
  ResponseMiddleware.tryCatchResponse(githubCallbackController),
);
