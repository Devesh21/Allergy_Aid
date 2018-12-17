const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.users;


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

router.post("/checkEmail", async(req,res) => {
    
    var user;
    try{
    user = await userData.getUsersEmail(req.body.email);
    console.log(user);
    
    }catch(err){
        console.log("error: "+ err);
    }
    if(user){
        res.send(true);
    }else{
        res.send(false);
    }
});

module.exports = router;