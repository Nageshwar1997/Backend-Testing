import "dotenv/config";
import path from "path";
import express, { Request, Response } from "express";
import { parse } from "qs";
import http from "http";

import { mailService, redisService } from "./services";
import { connectDB, socketConfigs } from "./configs";
import { envs } from "./envs";
import { router } from "./router";
import {
  CorsMiddleware,
  DatabaseMiddleware,
  LoggerMiddleware,
  RequestMiddleware,
  ResponseMiddleware,
} from "./middlewares";

const app = express();

// ----------------- MIDDLEWARES ORDER -----------------

// 1. Assign requestId first (for tracing logs)
app.use(RequestMiddleware.requestId);

// 2. Body parsers & static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("public")));
app.set("query parser", (str: string) => parse(str));

// 3. Logger (logs all requests)
app.use(LoggerMiddleware.requestLog);

// 4. Custom middlewares
app.use(ResponseMiddleware.successResponse);
app.use(CorsMiddleware.checkOrigin);
app.use(DatabaseMiddleware.checkDbConnection);

// ----------------- ROUTES -----------------
// Home Route
app.get("/", (_: Request, res: Response) =>
  res.success(200, "Welcome to the MERN Beautinique API"),
);

// API Routes
app.use("/api", router);

// ----------------- ERROR HANDLING -----------------
app.use(ResponseMiddleware.notFoundResponse);
app.use(LoggerMiddleware.errorLog);
app.use(ResponseMiddleware.errorResponse);

// ----------------- SERVER SETUP -----------------
const server = http.createServer(app);

// Initialize Socket.IO
socketConfigs.init(server);

socketConfigs.namespace("products");
socketConfigs.namespace("orders");

(async () => {
  try {
    await connectDB();
    await Promise.all([redisService.connect(), mailService.checkConnection()]);

    server.listen(envs.port, () => {
      console.log(`Server running on port: ${envs.port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
})();

export { app, server };
