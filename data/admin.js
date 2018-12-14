const mongoCollections = require("../config/mongoCollections");
const admin = mongoCollections.admin;
const uuid = require("node-uuid");
const bcrypt=require("bcrypt");
const saltRounds = 16;

function generateHashedPassword(password) {
	return bcrypt.hashSync(password, 10);
}


const exportedMethods = {

  async getAdminById(id) {
    const adminCollection = await admin();
    const adminstrator = await adminCollection.findOne({ _id: id });

    if (!adminstrator) throw "Adminstrator not found";
    return adminstrator;
  },

  async getAdminDetails() {
    const adminCollection = await admin();
    const adminDetails = await adminCollection.find({}).toArray();
    return adminDetails;
},
  async addAdmin(username, password, fName, lName) {
    if (typeof fName !== "string") throw "First name is not provided in string";
    if (typeof lName !== "string") throw "Last name is not provided in string";

    const adminCollection = await admin();

    const newAdmin = {
      username: username,
      password: password,
      fName: fName,
      lName:lName,
      _id: uuid.v4()
    };

    const newInsertInformation = await adminCollection.insertOne(newAdmin);
    const newId = newInsertInformation.insertedId;
    return await this.getAdminById(newId);
  }
/*
  async getStoreById(id) {
    const adminCollection = await admin();
    const store = await adminCollection.findOne({ _id: id });

    if (!store) throw "Store not found";
    return store;
  },
  async addStore(storeName, address, phoneNo, email) {
    if (typeof storeName !== "string") throw "Store Name is not provided in string";
    if (typeof phoneNo !== "number") throw "Format of Phone number is not correct";

    const adminCollection = await admin();

    const newStore = {
      storeName: storeName,
      address: address,
      phoneNo: phoneNo,
      email:email,
      _id: uuid.v4()
    };

    const newStoreInformation = await adminCollection.insertOne(newStore);
    const newStoreId = newStoreInformation.insertedId;
    return await this.getStoreById(newStoreId);
  },
  async removeStore(id) {
    const adminCollection = await admin();
    const deleteStoreInfo = await adminCollection.removeOne({ _id: id });
    if (deleteStoreInfo.deletedCount === 0) {
      throw `Could not delete Store with id of ${id}`;
    }
    console.log("Store deleted successfully ! ");
  }*/
};

module.exports = exportedMethods;
