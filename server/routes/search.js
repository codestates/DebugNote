const express = require('express');
const router = express.Router();
const searchController = require('../controllers/comment');
const isAuth = require('../middlewares/auth');

router.get('/', isAuth, searchController.get);
