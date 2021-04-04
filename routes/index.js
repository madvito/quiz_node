const express = require('express');
const questionsRoutes = require('./questions');
const categoriesRoutes = require('./categories');

const router = express.Router();

router.get('/',(req,res) =>{
    res.send('alo')
});

router.use('/api/v1/questions', questionsRoutes);

router.use('/api/v1/categories', categoriesRoutes);

module.exports = router;