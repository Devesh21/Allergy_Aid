const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index/homepage');
});
    
router.get('/index/about', (req, res) => {
    res.render('index/about');
});


router.get('/index/Usersignup', (req,res) => {
    res.render('users/signup');
});

router.get('/index/login', (req,res) => {
    res.render('users/login');
});

router.get('/user/signup', (req,res) => {
    res.render('users/signup');
});


module.exports = router;