require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./config/database");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const noticeRoutes = require("./routes/notices");
const alumniRoutes = require("./routes/alumni");
const commentRoutes = require('./routes/comments');

const app = express();
app.use(cors());
app.use(express.json()); // ✅ 최신 방식

app.use("/api/posts", postRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/alumni-news", alumniRoutes);
app.use('/api/posts/:postId/comments', commentRoutes); // ✅ mergeParams가 있어야 params 전달됨
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("🎉 Welcome to Yongjeong Alumni API!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

app.use((err, req, res, next) => {
  console.error("🔥 서버 전체 에러:", err);
  res.status(500).json({ msg: "서버 내부 오류 발생" });
});