const mongoCollections = require("../config/mongoCollections"); //connect to collections
const stores = mongoCollections.stores;	// get database
const uuid = require("node-uuid");
const bcrypt = require("bcrypt");

let exportedMethods = {
	/* getAllStore: get all stores informations */
	getAllStore() {
		return stores().then(storeCollection => {
			return storeCollection.find({}).toArray();
		});
	},

	/* getById: get store by id */
	getById(id) {
		return stores().then(storeCollection => {
			// find id and check if id exists
			return storeCollection.findOne({_id:id}).then(store => {
				if(!store) throw `Store with id ${id} not found`;
				return store;
			});
		});
	},
	async getStoreByEmail(email, password){
        const StoresCollection = await stores();
        const store = StoresCollection.findOne({ email : email});
        if(!store){
            throw "Store not found";
        }

        if(bcrypt.compareSync(password, store.password)){
            return store;
        }
        else{
            throw "Invalid Email ID or Password";
        }
    },
	/* addStore: add new store manager */
	async hash(password)
    {
        let hp;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        return hash;
    },
	async addStore(storeName,address,phone_no,email,password) {
		return stores().then(async storeCollection => {
			let hp = await this.hash(password); 
			let newStore = {
				storeName: storeName,
				address: address,
				phone_no: phone_no,
				email: email,
				password:hp,
				_id: uuid.v4()
			};
			return storeCollection.insertOne(newStore).then(newInsertedStore => {
				return newInsertedStore.insertedId;
			}).then(newId => {
				return this.getById(newId);
			});
		});
	},
	/* updateStore: update store informaion */
	updateStore(id,storeName,address,phone_no,email) {
		return stores().then(storeCollection => {
			let updates = {
				storeName: storeName,
				address: address,
				phone_no: phone_no,
				email: email
			};
			return storeCollection.updateOne({_id:id},{$set:updates}).then(newStore => {
				return this.getById(id);
			});
		});
	},

	/* removeStore(id) */
	removeStore(id) {
		return stores().then(storeCollection => {
			return storeCollection.removeOne({_id:id}).then(deleteInfo => {
				if(deleteInfo.deletedCound === 0) {
					thrwo `Could not delete store with id of ${id}`;
				}
				else{}
			});
		});
	}


};

module.exports = exportedMethods;
