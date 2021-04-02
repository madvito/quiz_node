const express = require('express');
const {getCategories, postCategories} = require('../controllers/categories');

const router = express.Router();

router.get('/', getCategories);
router.post('/', postCategories);

module.exports = router;