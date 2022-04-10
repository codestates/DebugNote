const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmark');
const isAuth = require('../middlewares/auth');

// 북마크 추가
router.post('/:id', isAuth, bookmarkController.post);

// 북마크 취소
router.delete('/:id', isAuth, bookmarkController.remove);

module.exports = router;
