import express from "express";
import Song from "../models/Song.js";

const router = express.Router();

// Overview
router.get("/overview", async (_req, res) => {
  try {
    const [totalSongs, artists, albums, genres] = await Promise.all([
      Song.countDocuments({}),
      Song.distinct("artist"),
      Song.distinct("album"),
      Song.distinct("genre"),
    ]);

    return res.json({
      totalSongs,
      totalArtists: artists.length,
      totalAlbums: albums.length,
      totalGenres: genres.length,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Failed to compute overview", error: err.message });
  }
});

// Songs per genre
router.get("/genres", async (_req, res) => {
  try {
    const rows = await Song.aggregate([
      { $group: { _id: "$genre", songs: { $sum: 1 } } },
      { $project: { _id: 0, genre: "$_id", songs: 1 } },
      { $sort: { songs: -1, genre: 1 } },
    ]);
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Failed to compute genre stats", error: err.message });
  }
});

// Per-artist
router.get("/artists", async (_req, res) => {
  try {
    const rows = await Song.aggregate([
      {
        $group: {
          _id: "$artist",
          songs: { $sum: 1 },
          albums: { $addToSet: "$album" },
        },
      },
      {
        $project: {
          _id: 0,
          artist: "$_id",
          songs: 1,
          albums: { $size: "$albums" },
        },
      },
      { $sort: { songs: -1, artist: 1 } },
    ]);
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Failed to compute artist stats", error: err.message });
  }
});

// Per-album
router.get("/albums", async (_req, res) => {
  try {
    const rows = await Song.aggregate([
      {
        $group: {
          _id: "$album",
          songs: { $sum: 1 },
          artists: { $addToSet: "$artist" },
        },
      },
      {
        $project: {
          _id: 0,
          album: "$_id",
          songs: 1,
          artists: { $size: "$artists" },
        },
      },
      { $sort: { songs: -1, album: 1 } },
    ]);
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Failed to compute album stats", error: err.message });
  }
});

// Top lists
router.get("/top", async (req, res) => {
  try {
    const { by = "songs", limit = 10 } = req.query;
    const lim = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);

    if (by === "songs") {
      const rows = await Song.aggregate([
        { $group: { _id: "$artist", songs: { $sum: 1 } } },
        { $project: { _id: 0, artist: "$_id", songs: 1 } },
        { $sort: { songs: -1, artist: 1 } },
        { $limit: lim },
      ]);
      return res.json({ by: "artistsBySongs", items: rows });
    }

    if (by === "albums") {
      const rows = await Song.aggregate([
        { $group: { _id: "$album", songs: { $sum: 1 } } },
        { $project: { _id: 0, album: "$_id", songs: 1 } },
        { $sort: { songs: -1, album: 1 } },
        { $limit: lim },
      ]);
      return res.json({ by: "albumsBySongs", items: rows });
    }

    return res
      .status(400)
      .json({ message: "Invalid 'by' parameter. Use 'songs' or 'albums'." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Failed to compute top list", error: err.message });
  }
});

export default router;
