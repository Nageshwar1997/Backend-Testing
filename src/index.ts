import "dotenv/config";
import path from "path";
import express, { Request, Response } from "express";
import { parse } from "qs";
import http from "http";

import { shared } from "./shared";
import { mailService, redisService } from "./shared/services";

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
app.use("/api", shared.router);

// ----------------- ERROR HANDLING -----------------
app.use(shared.middlewares.response.notFound);
app.use(shared.middlewares.logger.error);
app.use(shared.middlewares.response.error);

// ----------------- SERVER SETUP -----------------
const server = http.createServer(app);

// Initialize Socket.IO
shared.configs.socket.init(server);

shared.configs.socket.namespace("products");
shared.configs.socket.namespace("orders");

(async () => {
  try {
    await shared.configs.connectDB();
    await Promise.all([redisService.connect(), mailService.checkConnection()]);

    server.listen(shared.envs.port, () => {
      console.log(`Server running on port: ${shared.envs.port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
})();

export { app, server };
