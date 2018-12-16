const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const cookies = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.get("/:id", async (req, res) => {
    try {
        const user = await userData.getUserById(req.params.id);
        res.render("users/dashboard",{user:user});
    } catch (e) {
        res.status(404).json({ message: "not found!" });
    }
});

router.get("/", async (req, res) => {
    try {
        const userList = await userData.getAllUsers();
        res.json(userList);
    } catch (e) {
        res.status(500).send();
    }
});

router.post("/login", async (req, res) => {
    let loginUsername=req.body["email"];
    let loginPassword=req.body["password"];
    try{
        const user = await userData.getUserByEmail(loginUsername,loginPassword);
        res.cookie("AuthCookie", {user});
        res.redirect(`/users/${user._id}`)
    }catch(err){
        res.status(500).json({ error : err });
    }

})

router.post("/", async (req, res) => {
    let userInfo = req.body;

    	// Validation
        req.checkBody('fname', 'First Name is required').notEmpty();
        req.checkBody('lname', 'Last Name is required').notEmpty();
    	req.checkBody('email', 'Email is required').notEmpty();
    	req.checkBody('email', 'Email is not valid').isEmail();
    	req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('address', 'Address is required').notEmpty();
        req.checkBody('mobile', 'mobile is required').notEmpty();
        req.checkBody('mobile','mobile is not valid').isMobilePhone();
    
        var errors = req.validationErrors();
    
    	if(errors){
    		res.render('users/signup',{
    			errors:errors
    		});
        } 
        else {
            try{
                var allergyList = userInfo.allergy;
                
                allergyListArr = allergyList.split(",");
                for(var i in allergyListArr){
                    allergyListArr[i] = allergyListArr[i].trim();
                }
                
                const addedUser = await userData.addUser(userInfo.fname, 
                    userInfo.lname, userInfo.email, userInfo.password, 
                    userInfo.address, userInfo.mobile, allergyListArr);
        req.flash('success_msg', 'You are registered and can now login');
        //after signup cookie
        res.cookie("AuthCookie", {addedUser});
        //console.log(JSON.parse(req.cookies.AuthCookie));
        
        //res.json(addedUser);
        res.redirect('/');
    }catch(err){
        res.status(500).json({ error: err });
    }
}});

router.delete("/:id", async (req,res) => {
    try{
        checkuser = await userData.getUserById(req.body.id);
        if(checkuser){
            try{
                let deleteUser = await userData.removeUser(req.body.id);
                res.status(200).json({ "success" : true});
            }catch(err){
                res.status(500).json({ error: err });
            }
        }
    }catch(err){
        res.status(404).json({ error: err});
    };
});

/* Updated part */
router.get("/update/:id",async(req,res)=>{
    const id=req.params.id;
    res.render("users/updateProfile",{id:id});
})
router.post("/update/:id", async (req, res) => {
    const updatedData = req.body;
    try {
        await userData.getUserById(req.params.id);
    } catch (e) {
        res.status(404).json({ error: "User not found" });
    }
    
    try {
        const updatedUser = await userData.updateUser(req.params.id, updatedData);
        // res.redirect(`/users/${updatedUser._id}`)
        res.json(updatedUser)
    } catch (e) {
        res.status(500).json({ error: e });
    }
    // res.json(updatedData)
});


module.exports = router;
