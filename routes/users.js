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
        res.json(user);
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
        res.render("users/dashboard",{users:user});
    }catch(err){
        res.status(500).json({ error : err });
    }

})

// router.post("/", async (req, res) => {
//     let userInfo = req.body;
    
//     try{
//         var allergyList = userInfo.allergy;
        
//         allergyListArr = allergyList.split(",");
//         for(var i in allergyListArr){
//             allergyListArr[i] = allergyListArr[i].trim();
//         }
        
//         const addedUser = await userData.addUser(userInfo.fname, 
//             userInfo.lname, userInfo.email, userInfo.password, 
//             userInfo.address, userInfo.mobile, allergyListArr);
        
//         //after signup cookie
//         res.cookie("AuthCookie", {addedUser});
//         //console.log(JSON.parse(req.cookies.AuthCookie));
        
//         //res.json(addedUser);
//         res.redirect('/');
//     }catch(err){
//         res.status(500).json({ error: err });
//     }
// });

// Register User
router.post('/', function(req, res){
    var fname = req.body.fname;
    var lname = req.body.lname;
	var email = req.body.email;
	var password = req.body.password;
    var address = req.body.address;
    var mobile = req.body.mobile;
    var allergy=req.body.allergy;

	// Validation
    req.checkBody('fname', 'First Name is required').notEmpty();
    req.checkBody('lname', 'Last Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('address', 'Address is required').notEmpty();
    req.checkBody('contactNumber', 'Contact Number is required').notEmpty();

    var errors = req.validationErrors();
    
    var allergyList = allergy.allergy;
        
        allergyListArr = allergyList.split(",");
         for(var i in allergyListArr){
            allergyListArr[i] = allergyListArr[i].trim();


	if(errors){
		res.render('users/signup',{
			errors:errors
		});
    } 
    else {
		var newUser = new userData({
            fname: fname,
            lname: lname,
			email:email,
            password: password,
            address: address,
            mobile: mobile,
            allergyListArr
		});

		userData.addUser(newUser, function(err, user){
			if(err) throw err;
        });

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
}});

passport.use(new LocalStrategy(
  function(email, password, done) {
   User.getUserByEmail(email, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	userData.comparePassword(password, userData.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

//////


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
router.put("/:id", async (req, res) => {
    const updatedData = req.body;
    try {
        await userData.getUserById(req.params.id);
    } catch (e) {
        res.status(404).json({ error: "User not found" });
    }
    
    try {
        const updatedUser = await userData.updateUser(req.params.id, updatedData);
        res.json(updatedUser);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});


module.exports = router;
