import express from "express";
import Song from "../models/Song.js";

const router = express.Router();

// Create a song
router.post("/", async (req, res) => {
  try {
    const { title, artist, album, genre } = req.body;
    if (!title || !artist || !album || !genre) {
      return res
        .status(400)
        .json({ message: "title, artist, album, genre are required" });
    }

    const doc = await Song.create({ title, artist, album, genre });
    return res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Failed to create song", error: err.message });
  }
});

// List songs with filtering, search, pagination, sort
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      sort = "-createdAt",
      title,
      artist,
      album,
      genre,
      q,
    } = req.query;

    const query = {};
    if (title) query.title = new RegExp(title, "i");
    if (artist) query.artist = new RegExp(artist, "i");
    if (album) query.album = new RegExp(album, "i");
    if (genre) query.genre = new RegExp(genre, "i");
    if (q) {
      query.$or = [
        { title: new RegExp(q, "i") },
        { artist: new RegExp(q, "i") },
        { album: new RegExp(q, "i") },
        { genre: new RegExp(q, "i") },
      ];
    }

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);

    const [items, total] = await Promise.all([
      Song.find(query)
        .sort(sort)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Song.countDocuments(query),
    ]);

    return res.json({
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
      items,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Failed to list songs", error: err.message });
  }
});

// Get one
router.get("/:id", async (req, res) => {
  try {
    const doc = await Song.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Song not found" });
    return res.json(doc);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Invalid ID", error: err.message });
  }
});

// Update
router.patch("/:id", async (req, res) => {
  try {
    const allowed = ["title", "artist", "album", "genre"];
    const updates = Object.fromEntries(
      Object.entries(req.body || {}).filter(([k]) => allowed.includes(k))
    );
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const doc = await Song.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!doc) return res.status(404).json({ message: "Song not found" });
    return res.json(doc);
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "Failed to update", error: err.message });
  }
});

// Remove
router.delete("/:id", async (req, res) => {
  try {
    const doc = await Song.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "Song not found" });
    return res.json({ message: "Deleted", id: doc._id });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "Failed to delete", error: err.message });
  }
});

export default router;
