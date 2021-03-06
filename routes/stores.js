const express = require("express");
const router = express.Router();
const data = require("../data") //  require data folder 
const storeData = data.stores // suppose we have stores.js file in data folder
const prodData=data.prod

/* GET: get all stores detail */
router.get("/", async (req, res) => {
	try {
		const allStores = await storeData.getAllStore();
		res.render("stores/displayAll", {
			stores: allStores
		});
	}catch(e) {
		res.status(404).json({message:"Stores not found"});
	}
});


/* GET: find store by id */
router.get("/id/:id", async (req,res) => {
	try {
		const store = await storeData.getById(req.params.id);
		const storeProd=await prodData.getProdByStoreId(req.params.id);
		res.render("stores/Store",{
			stores:store,
			storeProds:storeProd
		});
	} catch(e) {
		res.status(404).json({message: " ID not found"});
	}
});

router.post("/signup", async (req, res) => {
	// first check if the request body provide all the informations: storeName, address, phone_no,email 
	const reqBody = req.body;
	// if(!reqBody.storeName || !reqBody.address || !reqBody.phone_no || !reqBody.email) {
	// 	res.status(400).json({message: "Please Provide all the informaions"});
	// 	return;
	// }
	// Validation
	req.checkBody('storeName', 'Store Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('address', 'Address is required').notEmpty();
	req.checkBody('phone_no', 'phone_no is required').notEmpty();
	req.checkBody('phone_no','phone_no is not valid').isMobilePhone();

	var errors = req.validationErrors();

	if(errors){
		res.render('stores/signup',{
			errors:errors
		});
	} 
	else {
	
	/* try Add New store manager */
	try{
		const {storeName,address,phone_no,email,password} = reqBody;
		const postStore = await storeData.addStore(storeName,address,phone_no,email,password);
		res.redirect(`/stores/id/${postStore._id}`);
	}catch(e) {
		res.status(500).json({message: " Create new Store failed"});
	}
}});

/* PATCH: Updates the specified with only the supplied changes */
router.patch("/:id", async(req,res) => {
	// get orginal store detail
	const store = await storeData.getById(req.params.id);
	let storeName = store.storeName;
	let address = store.address;
	let phone = store.phone_no;
	let email = store.email;
	const changes = req.body;
	if(changes.storeName) {
		storeName = changes.storeName;
	}
	if(changes.address) {
		address = changes.address;
	}
	if(changes.phone) {
		phone = changes.phone;
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

router.post("/login", async (req, res) => {
    let loginUsername=req.body["email"];
    let loginPassword=req.body["password"];
    try{
        const store = await storeData.getStoreByEmail(loginUsername, loginPassword);
        res.redirect(`/stores/id/${store._id}`)
    }catch(err){
        res.status(500).json({ error : err });
	}
})
/* Delete: remove store from db */
router.delete("/:id", async (req, res) => {
	try {
		const store = await storeData.removeStore(req.params.id);
		res.json(store);
	} catch(e) {
		res.status(404).json({message: "ID not found"});		
	}
});

module.exports = router;
