const mongoCollections = require("../config/mongoCollections");
const prods = mongoCollections.prods;
const uuid = require("node-uuid");


const getAllProds=async function getAllProds(){
    const prodCollection=await prods();
    return prodCollection.find({}).toArray();
}

const getProdById=async function getProdById(id){
    const prodCollection=await prods();
    const prod=await prodCollection.findOne({_id:id});

    if(!prod) throw "Production not exist!";
    return prod;
}

const addProd=async function addProd(Pname,S_id,ingredients,description){
    if(typeof Pname!=="string") throw "No name provided";
    if(typeof S_id!=="string") throw "No store Id provided";
    if(typeof ingredients!=="string") throw "No ingredient provided";
    if(typeof description!=="string") throw "No description provided";
    const comment=[];
    const prodCollection=await prods();
    const newProd={
        Pname:Pname,
        S_id:S_id,
        ingredients:ingredients,
        description:description,
        feedback:comment,
        _id:uuid.v4()
    };
    await prodCollection.insertOne(newProd);
    return newProd;
}

const searchProd=async function searchProd(Pname){
    const prodCollection=await prods();
    const prod=await prodCollection.find({Pname:eval("/"+Pname+"/i") }).toArray();
    return prod;
}

const filtersearchProd=async function filtersearchProd(Pname,UserInfo){
    const prodCollection=await prods();



    const prod=await prodCollection.find({Pname:Pname}).toArray();
}

const addComment=async function addComment(id,comment){
    const prodCollection=await prods();
    const prod=await prodCollection.findOne({_id:id});
    if(!prod) throw `Could not find production with id of ${id}`;
    const temComment=prod.feedback;
    temComment.push(comment);
    await prodCollection.updateOne({_id:id},{$set:{feedback:temComment}})
    return await this.getProdById(id);
}

const dropProd=async function dropProd(id){
    const prodCollection=await prods();
    const deletionInfo=await prodCollection.removeOne({ _id: id});
    if(deletionInfo.deletedCount===0){
        throw `Could not delete production with id of ${id}`;
    }
}
module.exports={
    getAllProds,
    getProdById,
    addProd,
    searchProd,
    addComment,
    dropProd
}
