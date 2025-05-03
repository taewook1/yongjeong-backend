const Comment = require('../models/commentModel');

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.getByPostId(req.params.postId);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: '댓글 불러오기 실패', error: err });
  }
};

exports.createComment = async (req, res) => {
  const { content } = req.body;
  const author = req.user?.name; // ✅ 실명 기반으로 저장

  if (!author || !content) {
    return res.status(400).json({ message: '작성자와 내용을 입력해주세요.' });
  }

  try {
    const commentId = await Comment.create(req.params.postId, author, content);
    res.status(201).json({ message: '댓글 작성 완료', commentId });
  } catch (err) {
    res.status(500).json({ message: '댓글 작성 실패', error: err });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const result = await Comment.delete(req.params.commentId);
    res.json({ message: '댓글 삭제 완료' });
  } catch (err) {
    res.status(500).json({ message: '댓글 삭제 실패', error: err });
  }
};