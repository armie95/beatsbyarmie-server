const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("assets"));

// Data
const playlist = require("./data/playlists.js");

// Routes

// Test route
app.get("/", (req, res) => {
  res.send("<h1>BeatsByArmie Backend is Running</h1>");
});

// Get all playlists
app.get("/fullPlaylist", (req, res) => {
  res.status(200).json(playlist);
});

// Get songs by playlist ID
app.get("/playlistSongs:id", (req, res) => {
  const playlistId = req.params.id.split(":")[1];

  const songsList = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", "songs.json"), "utf-8")
  );

  const findSongs = songsList.filter((song) => song.playlistId == playlistId);
  const findPlaylist = playlist.find((song) => song.id == playlistId);

  res.status(200).json({ songs: findSongs, playlist: findPlaylist });
});

// Add a comment to a playlist
app.post("/addComment", (req, res) => {
  const { comment, id } = req.body;
  const playlistId = id.split(":")[1];

  const index = playlist.findIndex((item) => item.id == playlistId);
  if (index === -1) {
    return res.status(404).json({ message: "Playlist not found" });
  }

  const newComment = {
    id: Date.now(),
    name: "Arman",
    timestamp: Date.now(),
    comment: comment,
  };

  playlist[index].comments.unshift(newComment);

  res.status(200).json({ playlist: playlist[index] });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
