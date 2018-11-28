const express=require("express");
const router=express.Router();
const data=require("../data");
const prodData=data.prod;


const getAll=async function getAll(req,res) {
    try{
        const prodList=await prodData.getAllProds();
        res.json(prodList);
    }catch(e){
        res.status(500).json({error:e});
    }
}
router.get("/",getAll);

const getById=async function getById(req,res){
    try{
        const prod=await prodData.getProdById(req.params.id);
        res.json(prod);
    }catch(e){
        res.status(500).json({error:e});
    }
}
router.get("/id/:id",getById);

const postProd=async function postProd(req,res){
    try{
        const Pname=req.body.Pname;
        const S_id=req.body.S_id;
        const ingredients=req.body.ingredients;
        const description=req.body.description;
        const newProd=await prodData.addProd(Pname,S_id,ingredients,description);
        res.json(newProd);
    }catch(e){
        res.status(500),json({ error: e});
    }
}
router.post("/",postProd);

const searchProd=async function searchProd(req,res){
    try{
        const prod=await prodData.searchProd(req.params.Pname);
        res.json(prod);
    }catch(e){
        res.status(500).json({error:e});
    }
}
router.get("/search/:Pname",searchProd);

//Still wording on addComment
const addComment=async function addComment(req,res){
    try{
        const newCom=req.body.comment;
        const newProd=await prodData.addComment(req.params.id);
        res.json(newProd);
    }catch(e){
        res.status(500).json({error:e});
    }
}
router.post("/addComment/:id",addComment);

const dropProd=async function dropProd(req,res){
    try{
        await prodData.getProdById(req.params.id);
    }catch(e){
        req.status(404).json({error:e});
    }
    try{
        await prodData.dropProd(req.params.id);
        res.status(200).json({"deleted":"OK"});
    }catch(e){
        res.status(500).json({error:e});
    }
}

router.delete("/id/:id",dropProd);

module.exports=router;