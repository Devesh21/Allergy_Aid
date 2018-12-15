const express = require("express");
const router = express.Router();
const data = require("../data");
const adminData = data.admin;
const storeData=data.stores
const userData=data.users

/* Get admin information through id */
router.get("/:id", async (req, res) => {
  try {
    const adminstrator = await adminData.getAdminById(req.params.id);
    res.json(adminstrator);
  } catch (e) {
    res.status(404).json({ error: "Adminstrator not found by id" });
  }
});

/* Get all the admin information  */
router.get("/", async (req, res) => {
  try {
      const adminDetails = await adminData.getAdminDetails();
      res.render("admin/adminDetails",{admin:adminDetails});
  } catch (e) {
      res.status(500).send();
  }
});

/* Admin information added through post */
router.post("/", async (req, res) => {
  const newlyAddedAdminData = req.body;
  try {
    const { username, password, fName, lName } = newlyAddedAdminData;
    const newAdmin = await adminData.addAdmin(username, password, fName, lName);

    res.json(newAdmin);
  } catch (e) {
    res.status(500).json({ error: "Unable to add adminstrator" });
  }
});

/* STORES */
/* Get all the store details */
router.get("/stores", async (req, res) => {
	try {
		const allStores = await storeData.getAllStores();
		res.render("stores/displayAll", {
			stores: allStores
		});
	}catch(e) {
		res.status(404).json({message:"Stores not found"});
	}
});

router.post("/stores", async (req, res) => {
	const newlyAddedStoreData = req.body;
	try {
	  const { storeName, address, phone_no, email } = newlyAddedStoreData;
	  const newStore = await storeData.addStore(storeName, address, phone_no, email);
  
	  res.json(newStore);
	} catch (e) {
	  res.status(500).json({ error: "Unable to add new Store" });
	}
  });
/*
 Get the store information through id 
router.get("/store/:id", async (req, res) => {
  try {
    const store = await adminData.getStoreById(req.params.id);
    res.json(store);
  } catch (e) {
    res.status(404).json({ error: "Store not found by id" });
  }
});

 To add new store 
router.post("/store", async (req, res) => {
  const newlyAddedStoreData = req.body;
  try {
    const { storeName, address, phoneNo, email } = newlyAddedStoreData;
    const newStore = await adminData.addStore(storeName, address, phoneNo, email);

    res.json(newStore);
  } catch (e) {
    res.status(500).json({ error: "Unable to add new Store" });
  }
});

 Delete an already existing store 
router.delete("/store/:id", async (req, res) => {
  try {
    await adminData.getStoreById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Store not found" });
  }
  try {
    await adminData.removeStore(req.params.id);
  } catch (e) {
    res.status(500).json({ error: "Cannot delete Store by id" });
  }
});  */

/* Update the existing users information */

router.patch("/:id", async(req,res) => {
	// get orginal store detail
	const store = await storeData.getById(req.params.id);
	let storeName = store.storeName;
	let address = store.address;
	let phone_no = store.phone_no;
	let email = store.email;
	const changes = req.body;
	if(changes.storeName) {
		storeName = changes.storeName;
	}
	if(changes.address) {
		address = changes.address;
	}
	if(changes.phone_no) {
		phone_no = changes.phone_no;
	}
	if(changes.email) {
		email = changes.email;
	}
	// try update store detail and report error if its failed
	try {
		const newStore = await storeData.updateStore(req.params.id,storeName,address,phone_no,email);
		res.json(newStore);
	}catch(e) {
		res.status(500).json({message: "Update failed!!"});
	}
});


/* To delete an already existing store */
router.delete("stores/:id", async (req, res) => {
	try {
		const store = await storeData.removeStore(req.params.id);
		res.json(store);
	} catch(e) {
		res.status(404).json({message: "ID not found"});		
	}
});

/* USERS */
/* Get the list of all the users */
router.get("/users", async (req, res) => {
  try {
      const userList = await userData.getAllUsers();
      res.render("users/displayAllUsers",{user:userList});
  } catch (e) {
      res.status(500).send();
  }
});

/* Add a new User */
router.post("/users", async (req, res) => {
  let userInfo = req.body;
  try{
      const addedUser = await userData.addUser(userInfo.fname, 
          userInfo.lname, userInfo.email, userInfo.password, 
          userInfo.address, userInfo.allergy);
      res.json(addedUser);
  }catch(err){
      res.status(500).json({ error: err });
  }
});

/* Delete an already existing user by id */
router.delete("/users/:id", async (req,res) => {
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

/* Update existing users information */
  router.put("/users/:id", async (req, res) => {
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
});

module.exports = router;
