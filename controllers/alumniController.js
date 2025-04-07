const AlumniNews = require('../models/alumniModel');

// 전체 동문 동정 반환
exports.getAllAlumniNews = async (req, res) => {
  try {
    const news = await AlumniNews.getAll();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: '동문 동정 조회 실패', error: err });
  }
};

// 최근 동문 동정 4개만 반환 (메인용)
exports.getLatestAlumniNews = async (req, res) => {
  try {
    const news = await AlumniNews.getLatest();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: '최신 동문 동정 조회 실패', error: err });
  }
};

// 동문 동정 작성
exports.createAlumniNews = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const insertId = await AlumniNews.create(title, content, author);
    res.status(201).json({ message: '동문 동정 등록 완료', id: insertId });
  } catch (err) {
    res.status(500).json({ message: '등록 실패', error: err });
  }
};