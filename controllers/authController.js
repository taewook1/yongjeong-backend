const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// ✅ 회원가입
exports.register = async (req, res) => {
  const { name, username, birth, phone, password, generation } = req.body;

  if (!name || !username || !birth || !phone || !password) {
    return res.status(400).json({ msg: "모든 필드를 입력해주세요." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create(name, username, birth, phone, hashedPassword, generation);

    res.status(200).json({ msg: "회원가입 완료!" });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ msg: "이미 사용 중인 아이디입니다." });
    }

    console.error("❌ 회원 생성 오류:", err);
    res.status(500).json({ msg: "회원가입 실패" });
  }
};

// ✅ 로그인
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "아이디와 비밀번호를 입력해주세요." });
  }

  try {
    const rows = await User.findByUsername(username);

    if (!rows || rows.length === 0) {
      return res.status(400).json({ msg: "존재하지 않는 아이디입니다." });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다." });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      id: user.id,
      name: user.name,
      username: user.username,
      birth: user.birth,
      phone: user.phone,
      token
    });
  } catch (err) {
    console.error("❌ 로그인 오류:", err);
    res.status(500).json({ msg: "서버 오류" });
  }
};
