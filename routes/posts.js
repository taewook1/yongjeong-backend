const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getPosts);               // 전체 목록
router.get('/:id', postController.getPostById);         // 개별 게시글
router.post('/', postController.createPost);            // 생성
router.put('/:id', postController.updatePost);          // 수정
router.delete('/:id', postController.deletePost);       // 삭제

module.exports = router;