const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 전체 공지사항
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM notices ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('전체 공지사항 조회 오류:', err);
    res.status(500).json({ msg: '공지사항 전체 조회 실패' });
  }
});

// 최신 공지사항 4개 불러오기
router.get('/latest', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM notices ORDER BY created_at DESC LIMIT 4');
    res.json(rows);
  } catch (err) {
    console.error('공지사항 조회 오류:', err);
    res.status(500).json({ msg: '공지사항 조회 실패' });
  }
});

module.exports = router;