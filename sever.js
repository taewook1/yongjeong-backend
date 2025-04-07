require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./config/database");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const noticeRoutes = require("./routes/notices"); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notices", noticeRoutes); 

app.get("/", (req, res) => {
  res.send("🎉 Welcome to Yongjeong Alumni API!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});