const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const db = require('../config/database');

// 인증번호 메모리 저장소
const codes = new Map();

// ✅ 회원가입 & 로그인
router.post("/register", register);
router.post("/login", login);

// ✅ 아이디 중복 확인
router.get("/check-username", async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: '아이디 누락' });

  try {
    console.log('중복 확인 요청 도착:', username);
    const [rows] = await db.query('SELECT id FROM users WHERE username = ?', [username]);
    console.log('조회 결과:', rows);
    res.json({ exists: rows.length > 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB 오류' });
  }
});

// ✅ 인증번호 전송
router.post("/send-code", (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: '전화번호 누락' });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  codes.set(phone, code);

  console.log(`[SMS] ${phone} → 인증번호: ${code}`); // 실서비스에서는 문자 API 사용

  res.json({ success: true });
});

// ✅ 인증번호 검증
router.post("/verify-code", (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code) return res.status(400).json({ error: '필수 항목 누락' });

  const valid = codes.get(phone) === code;
  if (valid) codes.delete(phone);

  res.json({ success: valid });
});

module.exports = router;