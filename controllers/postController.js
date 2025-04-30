const Post = require('../models/postModel');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.getAll();
    res.json(posts); 
  } catch (err) {
    console.error('❗게시글 불러오기 실패:', err);
    res.status(500).json({ message: '게시글 불러오기 실패', error: err });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.getById(id);
    if (!post) {
      return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: '게시글 조회 실패', error: err });
  }
};

exports.createPost = async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ message: '모든 필드를 입력해야 합니다.' });
  }
  try {
    const postId = await Post.create(title, content, author);
    res.status(201).json({ message: '게시글 작성 완료', postId });
  } catch (err) {
    res.status(500).json({ message: '작성 실패', error: err });
  }
};

exports.updatePost = async (req, res) => {
  const { title, content, author } = req.body;
  const { id } = req.params;
  if (!title || !content || !author) {
    return res.status(400).json({ message: '모든 필드를 입력해야 합니다.' });
  }
  try {
    const result = await Post.update(id, title, content, author);
    if (result.affectedRows === 0) {
      return res.status(403).json({ message: '수정 권한이 없습니다.' });
    }
    res.json({ message: '수정 완료' });
  } catch (err) {
    res.status(500).json({ message: '수정 실패', error: err });
  }
};

exports.deletePost = async (req, res) => {
  const { author } = req.body;
  const { id } = req.params;
  if (!author) {
    return res.status(400).json({ message: '작성자 정보가 필요합니다.' });
  }
  try {
    const result = await Post.delete(id, author);
    if (result.affectedRows === 0) {
      return res.status(403).json({ message: '삭제 권한이 없습니다.' });
    }
    res.json({ message: '삭제 완료' });
  } catch (err) {
    res.status(500).json({ message: '삭제 실패', error: err });
  }
};
