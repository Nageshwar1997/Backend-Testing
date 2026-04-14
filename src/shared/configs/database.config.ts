import mongoose from "mongoose";
import { envs } from "../../envs";

// TypeScript global augmentation
declare global {
  var mongooseConn: typeof mongoose | null;
}

// Connection config interface
interface IMongoOptions {
  serverSelectionTimeoutMS: number;
  socketTimeoutMS: number;
  maxPoolSize: number;
  minPoolSize?: number;
}

// Connection cache
let cachedConnection: typeof mongoose | null = global.mongooseConn || null;

// Default connection options
const MONGO_OPTIONS: IMongoOptions = {
  serverSelectionTimeoutMS: 5000, // 5 seconds connection timeout
  socketTimeoutMS: 45000, // 45 seconds query timeout
  maxPoolSize: 10, // Max connections in pool
  minPoolSize: 2, // Min connections to maintain
};

/**
 * Establishes or returns cached MongoDB connection
 * @returns {Promise<typeof mongoose>} Mongoose connection
 * @throws {Error} If connection fails
 */

export const databaseConfig = async (): Promise<typeof mongoose> => {
  // Use cached connection if exists
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!envs.mongo_uri) {
    throw new Error("MONGODB_URI environment variable not defined");
  }

  console.log("🔌 Establishing new MongoDB connection...");

  const newConnection = await mongoose.connect(envs.mongo_uri, {
    ...MONGO_OPTIONS,
    ...(envs.is_dev && { maxPoolSize: 5, minPoolSize: 1 }),
  });

  cachedConnection = newConnection;

  // Store globally for hot reload (dev)
  if (envs.is_dev) {
    global.mongooseConn = newConnection;
  }

  console.log("✅ MongoDB connected successfully");

  // Event handlers
  newConnection.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
    cachedConnection = null;
  });

  newConnection.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected");
    cachedConnection = null;
  });

  return newConnection;
};
