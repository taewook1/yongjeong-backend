const express = require('express');
const router = express.Router({ mergeParams: true });
const commentController = require('../controllers/commentController');
const authenticateUser = require('../middleware/authMiddleware'); 

router.get('/', commentController.getComments);
router.post('/', authenticateUser, commentController.createComment); 
router.delete('/:commentId', authenticateUser, commentController.deleteComment);

module.exports = router;