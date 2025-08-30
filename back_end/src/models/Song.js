import mongoose from "mongoose";

const SongSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    album: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// Helpful indexes
SongSchema.index({ title: "text", artist: "text", album: "text" });
SongSchema.index({ artist: 1 });
SongSchema.index({ album: 1 });
SongSchema.index({ genre: 1 });

export default mongoose.model("Song", SongSchema);
