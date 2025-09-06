import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in env");
}

// IMPORTANT: cache the connection in dev so hot-reloads don’t open many sockets
let cached = (global as any)._mongoose as
  | {
      conn: typeof mongoose | null;
      promise: Promise<typeof mongoose> | null;
    }
  | undefined;

if (!cached) {
  cached = (global as any)._mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached!.conn) return cached!.conn;

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI, {
      // options here if needed
    });
  }
  cached!.conn = await cached!.promise;
  return cached!.conn;
}
