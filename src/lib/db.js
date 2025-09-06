import mongoose from "mongoose";

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in env");
}

// cache the connection in dev so hot-reloads don’t open many sockets
const globalForMongoose = globalThis;
let cached = globalForMongoose._mongoose;
if (!cached) {
  cached = globalForMongoose._mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      // options here if needed
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

