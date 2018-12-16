const express=require("express");
const router=express.Router();
const data=require("../data");
const prodData=data.prod;
const storeData=data.stores;


const getAll=async function getAll(req,res) {
        const prodList=await prodData.getAllProds();
        res.render("prods/displayAll",{prods:prodList});
}
router.get("/",getAll);

const getById=async function getById(req,res){
        const prod=await prodData.getProdById(req.params.id);
        const store=await storeData.getById(prod.S_id);
        res.render("prods/displayItemforUser",{prod:prod,store:store});
}
router.get("/id/:id",getById);

const getByIdStoreVersion=async function getByIdStoreVersion(req,res){
    const prod=await prodData.getProdById(req.params.id);
    res.render("prods/displayItem",{prod:prod});
}
router.get("/id/storeverison/:id",getByIdStoreVersion);

//addProd
const getAdd=function getAdd(req,res){
    res.render("prods/addItem",{
        storeId:req.params.id
    });
}
router.get("/addItem/:id",getAdd);

const postProd=async function postProd(req,res){
    let postData=req.body;
    let errors=[];
    if (!postData.Pname) {
        errors.push("No Pname provided");
    }
    if (!postData.ingredients) {
        errors.push("No ingredients provided");
    }
    if (!postData.description) {
        errors.push("No description provided");
    }
    if (errors.length > 0) {
        res.render("prods/addItem", {
          errors: errors,
          hasErrors: true,
          post: postData
        });
        return;
    }
    try {
        const newProd = await prodData.addProd(
            postData.Pname,
            req.params.id,
            postData.ingredients,
            postData.description
        );
        res.redirect(`/stores/id/${req.params.id}`);
      } catch (e) {
        res.status(500).json({ error: e });
      }
}
router.post("/addItem/:id",postProd);
//end addProd

//searchProd
const searchProd=async function searchProd(req,res){
    try{
        const prod=await prodData.searchProd(req.params.Pname);
        if(prod.length==0){
            res.render("prods/searchResultwrong");
        }else{
            res.render("prods/searchResult",{prods:prod});
        }
    }catch(e){
        res.status(500).json({error:e});
    }
}
router.get("/search/:Pname",searchProd);

const getSearch=function getSearch(req,res){
    res.render("prods/searchItem");
}
router.get("/search",getSearch);

const postSearch=async function postSearch(req,res){
    let postData=req.body;
    let errors=[];
    if (!postData.Pname) {
        errors.push("No Pname provided");
    }if (errors.length > 0) {
        res.render("prods/searchItem", {
          errors: errors,
          hasErrors: true,
          post: postData
        });
        return;
    }
    res.redirect(`/prod/search/${req.body.Pname}`);
}
router.post("/search",postSearch);
//end searchProd

//addComment
const getAddcomment=function getAddcomment(req,res){
    let thisid=req.params.id;
    res.render("prods/addFeedback",{id:thisid});
}
router.get("/addComment/:id",getAddcomment);

const addComment=async function addComment(req,res){
    const id=req.params.id;
    let postData=req.body;
    let errors=[];
    if (!postData.comment) {
        errors.push("No feedback provided");
    }
    if (errors.length > 0) {
        res.render("prods/addFeedback", {
          id:id,
          errors: errors,
          hasErrors: true,
          post: postData
        });
        return;
    }
    try{
        const newCom=req.body.comment;
        const id=req.params.id;
        await prodData.addComment(id,newCom);
        res.redirect(`/prod/id/${id}`);
    }catch(e){
        res.status(500).json({error:e});
    }
}
router.post("/addComment/:id",addComment);

const dropProd=async function dropProd(req,res){
    try{
        await prodData.getProdById(req.params.id);
    }catch(e){
        res.status(404).json({error:e});
    }
    try{
        const tem=await prodData.getProdById(req.params.id);
        const storeid=tem.S_id;
        await prodData.dropProd(req.params.id);
        res.redirect(`/stores/id/${storeid}`);
    }catch(e){
        res.status(500).json({error:e});
    }
}
router.post("/delete/:id",dropProd);

module.exports=router;
