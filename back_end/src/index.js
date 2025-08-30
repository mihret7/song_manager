import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import songsRouter from "./routes/songs.js";
import statsRouter from "./routes/stats.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/songdb";

// Middlewares
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// Healthcheck
app.get("/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Routes
app.use("/api/songs", songsRouter);
app.use("/api/stats", statsRouter);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", path: req.originalUrl });
});

// Start server after DB connect
connectDB(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server due to DB error:", err.message);
    process.exit(1);
  });
