const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;

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

router.post("/", async (req, res) => {
    let userInfo = req.body;
    try{
        var allergyList = userInfo.allergy;
        
        allergyListArr = allergyList.split(",");
        for(var i in allergyListArr){
            allergyListArr[i] = allergyListArr[i].trim();
        }
        
        const addedUser = await userData.addUser(userInfo.fname, 
            userInfo.lname, userInfo.email, userInfo.password, 
            userInfo.address, userInfo.mobile, allergyListArr);
        res.json(addedUser);
    }catch(err){
        res.status(500).json({ error: err });
    }
});

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
