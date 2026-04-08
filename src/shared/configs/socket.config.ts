import { Server as HttpServer } from "http";
import {
  Server as SocketIOServer,
  Socket as SocketIO,
  Namespace,
} from "socket.io";

import { sharedClasses } from "../classes";
import { sharedConstants } from "../constants";
import { chatbotModule } from "@/modules/chatbot";

let io: SocketIOServer | null = null;

const InitSocket = (server: HttpServer) => {
  if (io) return io;

  io = new SocketIOServer(server, {
    cors: {
      origin: (origin, callback) => {
        if (!origin || sharedConstants.ALLOWED_ORIGINS.includes(origin)) {
          callback(null, true);
        } else {
          callback(
            new sharedClasses.AppError({
              message: "Not allowed by CORS",
              statusCode: 403,
              code: "AUTH_ERROR",
            }),
          );
        }
      },
      methods: ["GET", "POST"],
    },
  });

  return io;
};

const HandleNamespace = (name: "products" | "orders") => {
  if (!io) throw new Error("Socket.IO not initialized");

  const nsp: Namespace = io.of(`/${name}`); // namespace created only when first client connects

  nsp.on("connection", (socket: SocketIO) => {
    console.log(`Client connected on /${name} namespace:`, socket.id);
    if (name === "products") {
      chatbotModule.sockets.product(socket);
    } else if (name === "orders") {
      chatbotModule.sockets.order(socket);
    }

    socket.on("disconnect", () => {
      console.log(`Client disconnected from /${name} namespace:`, socket.id);
    });
  });

  return nsp;
};

export const socketConfigs = {
  init: InitSocket,
  namespace: HandleNamespace,
};
