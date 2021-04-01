const express = require('express');
const {getQuestions, postQuestions, setQuestion} = require('../controllers/questions');

const router = express.Router();

router.get('/', getQuestions);

router.post('/', postQuestions);

router.post('/new',setQuestion);

module.exports = router;