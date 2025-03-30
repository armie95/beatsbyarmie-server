const now = Date.now();

module.exports = [
  {
    id: 1,
    album_image: "travis.jpg",
    name: "Dark Vibes",
    description: "Driving home at 2am",
    comments: [
      {
        id: "1",
        name: "armaan",
        timestamp: now - 5 * 60 * 1000, // 5 minutes ago
        comment: "this song is amazing!",
      },
      {
        id: "2",
        name: "John Wall",
        timestamp: now - 10 * 60 * 1000, // 10 minutes ago
        comment: "My theme song!",
      },
      {
        id: "3",
        name: "Chris",
        timestamp: now - 15 * 60 * 1000, // 15 minutes ago
        comment: "this song is amazing!",
      },
      {
        id: "4",
        name: "Steven",
        timestamp: now - 30 * 60 * 1000, // 30 minutes ago
        comment:
          "This song will always make me feel some type of way. Its liitt man.",
      },
    ],
  },
  {
    id: 2,
    album_image: "riri.jpg",
    name: "Energy Vibes",
    description: "Uptempo and fast",
    comments: [
      {
        id: "5",
        name: "will",
        timestamp: now - 2 * 60 * 60 * 1000, // 2 hours ago
        comment: "this is next level",
      },
      {
        id: "6",
        name: "arman",
        timestamp: now - 90 * 60 * 1000, // 1.5 hours ago
        comment: "this is next level",
      },
      {
        id: "7",
        name: "arman",
        timestamp: now - 60 * 60 * 1000, // 1 hour ago
        comment: "this is next level",
      },
      {
        id: "8",
        name: "arman",
        timestamp: now - 30 * 60 * 1000, // 30 minutes ago
        comment: "this is next level",
      },
    ],
  },
  {
    id: 3,
    album_image: "playboi3.jpg",
    name: "Cloudy Vibes",
    description: "Airy and ambient vibes",
    comments: [
      {
        id: "9",
        name: "arman",
        timestamp: now - 8 * 60 * 1000,
        comment: "this is so cool",
      },
      {
        id: "10",
        name: "arman",
        timestamp: now - 9 * 60 * 1000,
        comment: "this is so cool",
      },
      {
        id: "11",
        name: "arman",
        timestamp: now - 11 * 60 * 1000,
        comment: "this is so cool",
      },
      {
        id: "12",
        name: "arman",
        timestamp: now - 13 * 60 * 1000,
        comment: "this is so cool",
      },
      {
        id: "13",
        name: "arman",
        timestamp: now - 14 * 60 * 1000,
        comment: "this is so cool",
      },
    ],
  },
  {
    id: 4,
    album_image: "concert.jpg",
    name: "OutterSpace",
    description: "Floatin in space",
    comments: [
      {
        id: "14",
        name: "John Wayne",
        timestamp: now - 1 * 60 * 1000, // 1 min ago
        comment: "Hey I wanna use the first song, for my album",
      },
      {
        id: "15",
        name: "John Wick",
        timestamp: now - 2 * 60 * 1000,
        comment: "Hey I wanna use the first song, for my album",
      },
      {
        id: "16",
        name: "John Wick",
        timestamp: now - 3 * 60 * 1000,
        comment: "Hey I wanna use the first song, for my album🔥",
      },
    ],
  },
];
