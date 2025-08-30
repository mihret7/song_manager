import mongoose from "mongoose";

export async function connectDB(uri) {
  mongoose.set("strictQuery", true);

  // Connection events
  mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB connected");
  });
  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️  MongoDB disconnected");
  });

  return mongoose.connect(uri);
}
