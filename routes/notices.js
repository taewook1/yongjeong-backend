const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

// 공지사항 전체 조회
router.get('/', noticeController.getNotices);

// 최근 공지사항 4개 조회
router.get('/latest', noticeController.getLatestNotices);

// 공지사항 작성 (관리자만 사용하도록 이후 제한 가능)
router.post('/', noticeController.createNotice);

module.exports = router;