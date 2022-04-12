const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');
// const isAuth = require('../middlewares/auth');

router.get('/', searchController.get);

module.exports = router;
