const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
		res.render('index/homepage');
    });
    
router.get('/index/about', (req, res) => {
    res.render('index/about');
});


module.exports = router;