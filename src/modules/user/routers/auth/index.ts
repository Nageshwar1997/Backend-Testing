import { Router } from "express";
import { loginRouter } from "./login.router";
import { registerRouter } from "./register.router";
import { passwordRouter } from "./password.router";

export const authRouter = Router();

authRouter.use("/login", loginRouter);
authRouter.use("/register", registerRouter);
authRouter.use("/password", passwordRouter);
