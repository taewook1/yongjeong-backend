const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 동창 동정 4개 불러오기
router.get('/latest', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM alumni_news ORDER BY created_at DESC LIMIT 4');
    res.json(rows);  // 동창 동정 4개 반환
  } catch (err) {
    console.error('❌ 동창 동정 조회 오류:', err);
    res.status(500).json({ msg: '동창 동정 조회 실패' });
  }
});

module.exports = router;