const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

dotenv.config();
const app = express();

// ✅ CORS config: allow both local dev + deployed frontend
const corsOptions = {
  origin: [
    "https://beatsbyarmie-client.onrender.com",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("assets"));

// Load playlist data
const playlist = require("./data/playlists.js");

// 🔥 Test route
app.get("/", (req, res) => {
  res.send("<h1>BeatsByArmie Backend is Running</h1>");
});

// 🎧 All playlists
app.get("/fullPlaylist", (req, res) => {
  res.status(200).json(playlist);
});

// 🎶 Songs by playlist ID
app.get("/playlistSongs/:id", (req, res) => {
  const playlistId = parseInt(req.params.id);

  const songsList = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", "songs.json"), "utf-8")
  );

  const findSongs = songsList.filter((song) => song.playlistId === playlistId);
  const findPlaylist = playlist.find((song) => song.id === playlistId);

  if (!findPlaylist) {
    return res.status(404).json({ message: "Playlist not found" });
  }

  res.status(200).json({ songs: findSongs, playlist: findPlaylist });
});

// 💬 Add comment
app.post("/addComment", (req, res) => {
  const { comment, playlistId } = req.body;

  if (!playlistId || !comment) {
    return res.status(400).json({ message: "Missing playlistId or comment" });
  }

  const index = playlist.findIndex((item) => item.id === playlistId);
  if (index === -1) {
    return res.status(404).json({ message: "Playlist not found" });
  }

  const newComment = {
    id: Date.now(),
    name: "John Wick", // You can change this to accept dynamic names
    timestamp: Date.now(),
    comment,
  };

  playlist[index].comments.unshift(newComment);

  const songsList = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", "songs.json"), "utf-8")
  );
  const playlistSongs = songsList.filter((song) => song.playlistId === playlistId);

  res.status(200).json({ playlist: playlist[index], songs: playlistSongs });
});

// 🚀 Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
