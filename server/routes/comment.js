const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const isAuth = require('../middlewares/auth');

// 댓글 작성
router.post('/:id', isAuth, commentController.post);

// 댓글 가져오기
router.get('/:id', isAuth, commentController.get);

// 댓글 수정
router.put('/:id', isAuth, commentController.put);

// 댓글 삭제
router.delete('/:id', isAuth, commentController.remove);

module.exports = router;