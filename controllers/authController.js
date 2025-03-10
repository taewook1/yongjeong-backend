const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  User.findByEmail(email, async (err, result) => {
    if (err) {
      console.error("❌ MySQL 조회 중 오류 발생:", err);
      return res.status(500).json({ msg: "서버 내부 오류" });
    }

    if (!result || result.length === 0) {
      // 🔹 예외 처리 추가
      console.log("✅ 이메일 중복 없음, 회원가입 진행 가능");
    } else {
      return res.status(400).json({ msg: "이미 존재하는 이메일입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    User.create(name, email, hashedPassword, (err, result) => {
      if (err) throw err;
      res.json({ msg: "회원가입 완료!" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, async (err, result) => {
    if (result.length === 0) {
      return res.status(400).json({ msg: "사용자가 없습니다." });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "비밀번호가 틀렸습니다." });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
};
