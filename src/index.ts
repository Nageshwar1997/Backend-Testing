import "dotenv/config";
import path from "path";
import express, { Request, Response } from "express";
import { parse } from "qs";
import http from "http";

import { shared } from "./shared";
import { mailService, redisService } from "./shared/services";
import { connectDB, socketConfigs } from "./configs";
import { envs } from "./envs";
import { router } from "./router";

const app = express();

// ----------------- MIDDLEWARES ORDER -----------------

// 1. Assign requestId first (for tracing logs)
app.use(shared.middlewares.request.id);

// 2. Body parsers & static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("public")));
app.set("query parser", (str: string) => parse(str));

// 3. Logger (logs all requests)
app.use(shared.middlewares.logger.request);

// 4. Custom middlewares
app.use(shared.middlewares.response.success);
app.use(shared.middlewares.cors);
app.use(shared.middlewares.database);

// ----------------- ROUTES -----------------
// Home Route
app.get("/", (_: Request, res: Response) =>
  res.success(200, "Welcome to the MERN Beautinique API"),
);

// API Routes
app.use("/api", router);

// ----------------- ERROR HANDLING -----------------
app.use(shared.middlewares.response.notFound);
app.use(shared.middlewares.logger.error);
app.use(shared.middlewares.response.error);

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
