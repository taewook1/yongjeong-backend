const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');

// 동문 동정 전체 조회
router.get('/', alumniController.getAllAlumniNews);

// 최근 4개 조회 (메인 페이지용)
router.get('/latest', alumniController.getLatestAlumniNews);

// 작성
router.post('/', alumniController.createAlumniNews);

module.exports = router;