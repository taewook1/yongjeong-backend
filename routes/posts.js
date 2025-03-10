const express = require("express");
const db = require("../config/database");

const router = express.Router();

// ✅ 1. 게시글 작성 (Create)
router.post("/", (req, res) => {
  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    return res.status(400).json({ msg: "모든 필드를 입력해야 합니다." });
  }

  db.query(
    "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)",
    [title, content, userId],
    (err, result) => {
      if (err) return res.status(500).json({ msg: "서버 오류", error: err });
      res.json({ msg: "게시글 작성 완료!", postId: result.insertId });
    }
  );
});

// ✅ 2. 게시글 목록 조회 (Read)
router.get("/", (req, res) => {
  db.query("SELECT * FROM posts ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ msg: "서버 오류", error: err });
    res.json(results);
  });
});

// ✅ 3. 특정 게시글 조회 (Read)
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM posts WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ msg: "서버 오류", error: err });
    if (result.length === 0)
      return res.status(404).json({ msg: "게시글이 존재하지 않습니다." });

    res.json(result[0]);
  });
});

// ✅ 4. 게시글 수정 (Update)
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    return res.status(400).json({ msg: "모든 필드를 입력해야 합니다." });
  }

  db.query(
    "UPDATE posts SET title = ?, content = ? WHERE id = ? AND user_id = ?",
    [title, content, id, userId],
    (err, result) => {
      if (err) return res.status(500).json({ msg: "서버 오류", error: err });
      if (result.affectedRows === 0)
        return res.status(403).json({ msg: "게시글 수정 권한이 없습니다." });

      res.json({ msg: "게시글 수정 완료!" });
    }
  );
});

// ✅ 5. 게시글 삭제 (Delete)
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  db.query(
    "DELETE FROM posts WHERE id = ? AND user_id = ?",
    [id, userId],
    (err, result) => {
      if (err) return res.status(500).json({ msg: "서버 오류", error: err });
      if (result.affectedRows === 0)
        return res.status(403).json({ msg: "게시글 삭제 권한이 없습니다." });

      res.json({ msg: "게시글 삭제 완료!" });
    }
  );
});

module.exports = router;
