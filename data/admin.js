const mongoCollections = require("../config/mongoCollections");
const admin = mongoCollections.admin;
const uuid = require("node-uuid");

const exportedMethods = {

  async getAdminById(id) {
    const adminCollection = await admin();
    const adminstrator = await adminCollection.findOne({ _id: id });

    if (!adminstrator) throw "Adminstrator not found";
    return adminstrator;
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
};

module.exports = exportedMethods;