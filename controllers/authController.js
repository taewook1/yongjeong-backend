const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// ✅ 회원가입
exports.register = (req, res) => {
  const { name, username, birth, phone, email, password } = req.body;

  if (!name || !username || !birth || !phone || !email || !password) {
    return res.status(400).json({ msg: "모든 필드를 입력해주세요." });
  }

  User.findByEmail(email, async (err, result) => {
    if (err) {
      console.error("❌ 이메일 조회 오류:", err);
      return res.status(500).json({ msg: "서버 내부 오류" });
    }

    if (result.length > 0) {
      return res.status(400).json({ msg: "이미 존재하는 이메일입니다." });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      User.create(name, username, birth, phone, email, hashedPassword, (err, created) => {
        if (err) {
          console.error("❌ 회원 생성 오류:", err);
          return res.status(500).json({ msg: "회원가입 실패" });
        }
        res.json({ msg: "회원가입 완료!" });
      });
    } catch (error) {
      console.error("❌ 해시 처리 오류:", error);
      res.status(500).json({ msg: "비밀번호 암호화 실패" });
    }
  });
};

// ✅ 로그인은 그대로 유지 (이메일 기준 로그인)
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "이메일과 비밀번호를 입력해주세요." });
  }

  User.findByEmail(email, async (err, result) => {
    if (err) {
      console.error("❌ 로그인 중 DB 오류:", err);
      return res.status(500).json({ msg: "서버 오류" });
    }

    if (!result || result.length === 0) {
      return res.status(400).json({ msg: "존재하지 않는 사용자입니다." });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다." });
    }

    try {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          birth: user.birth,
          phone: user.phone,
          email: user.email,
        },
      });
    } catch (err) {
      console.error("❌ JWT 생성 실패:", err);
      res.status(500).json({ msg: "토큰 생성 오류" });
    }
  });
};