const express = require('express');
const questionsRoutes = require('./questions');
const categoriesRoutes = require('./categories');

const router = express.Router();

router.get('/',(req,res) =>{
    res.send('alo')
});

router.use('/questions', questionsRoutes);

router.use('/categories', categoriesRoutes);

module.exports = router;