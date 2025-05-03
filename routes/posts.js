const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateUser = require('../middleware/authMiddleware'); // ✅ 추가

router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);

// ✅ 인증 필요한 요청들에만 미들웨어 연결
router.post('/', authenticateUser, postController.createPost);
router.put('/:id', authenticateUser, postController.updatePost);
router.delete('/:id', authenticateUser, postController.deletePost);

module.exports = router;