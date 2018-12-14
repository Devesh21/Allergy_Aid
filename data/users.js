const mongoCollection = require("../config/mongoCollections");
const users = mongoCollection.users;
const uuid = require("uuid");

let exportedMethods = {

    async getAllUsers() {
        const usersCollection = await users();
        const allUsers = await usersCollection.find({}).toArray();
        return allUsers;
    },

    async getUserById(id){
        const usersCollection = await users();
        const user = usersCollection.findOne({_id : id});
        if(!user){
            throw "User not found";
        }
        return user;
    },

    async addUser(fname, lname, email, password, address, allergy){
        const usersCollection = await users();
        const newUser = {
            _id: uuid.v4(),
            fname: fname,
            lName: lname,
            email: email,
            password: password,
            address: address,
            allergy: allergy,
            cart: []
        };
        const newAddedUser = await usersCollection.insertOne(newUser);
        let newUserId = await newAddedUser.insertedId;
        let addedUser = await this.getUserById(newUserId);
        return addedUser;
    },

    async removeUser(id){
        const usersCollection = await users();
        const userInfo = usersCollection.findOne({_id : id});
        const deletionInfo = usersCollection.removeOne({_id : id});
        if(deletionInfo.deletedCount === 0){
            throw "Could not delete given user";
        }
        return userInfo;
    },

    /* Updated Part */
    async updateUser(id, updatedUser) {
        const usersCollection = await users();
    
        const updatedUserData = {};
    
        if (updatedUser.fname) {
            updatedUserData.fname = updatedUser.fname;
        }
    
        if (updatedUser.lName) {
            updatedUserData.lName = updatedUser.lName;
        }
    
        if (updatedUser.email) {
            updatedUserData.email = updatedUser.email;
        }

        if (updatedUser.password) {
            updatedUserData.password = updatedUser.password;
        }
    
        if (updatedUser.address) {
            updatedUserData.address = updatedUser.address;
        }
    
        if (updatedUser.allergy) {
            updatedUserData.allergy = updatedUser.allergy;
        }
    
        let updateCommand = {
          $set: updatedPostData
        };
        const query = {
          _id: id
        };
        await usersCollection.updateOne(query, updateCommand);
    
        return await this.getUserById(id);
      }

}

module.exports = exportedMethods;