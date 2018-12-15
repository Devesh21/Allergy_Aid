const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index/homepage');
});
    
router.get('/index/about', (req, res) => {
    res.render('index/about');
});

router.get('/user/signup', (req,res) => {
    res.render('users/signup');
});

router.get('/user/login', (req,res) => {
    res.render('users/login');
});

module.exports = router;