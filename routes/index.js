const express = require('express');
const questionsRoutes = require('./questions');

const router = express.Router();

router.get('/',(req,res) =>{
    res.send('alo')
});
// router.get('/questions', (req,res)=>{res.send('asdasd')});
router.use('/questions', questionsRoutes);

module.exports = router;