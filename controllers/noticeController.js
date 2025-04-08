const Notice = require('../models/noticeModel');

// 전체 공지사항 목록 반환
exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.getAll();
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: '공지사항 조회 실패', error: err });
  }
};

// 🔥 최근 공지사항 4개만 반환 (메인용)
exports.getLatestNotices = async (req, res) => {
  const limit = parseInt(req.query.limit) || 4;

  try {
    const notices = await Notice.getLatest(limit);
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: '최신 공지사항 조회 실패', error: err });
  }
};

// 공지사항 작성
exports.createNotice = async (req, res) => {
  const { title, content } = req.body;
  try {
    const insertId = await Notice.create(title, content);
    res.status(201).json({ message: '공지사항 작성 완료', id: insertId });
  } catch (err) {
    res.status(500).json({ message: '작성 실패', error: err });
  }
};