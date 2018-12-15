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

router.get('/store/signup', (req,res) => {
    res.render('stores/signup');
});

router.get('/store/login', (req,res) => {
    res.render('stores/login');
});

module.exports = router;