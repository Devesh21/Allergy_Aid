/* Importing all the neccessary modules */
const express = require('express');
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const cookieParser=require("cookie-parser")
const data=require("./data");
const prodData=data.prod;
/* Starting Express Server */
const app = express();

/* Body Parser Configuration */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/*user cookie check*/
const userCheckCookie=function userCheckCookie(req,res,next){
    if(!req.cookies.AuthCookie){
        res.redirect("/user/login");
    }else {
        next();
    }
}

const getsearchfilter=function getsearchfilter(req,res){
    res.render("prods/filtersearchItem");
}
app.get("/prod/searchfilter",userCheckCookie,getsearchfilter);

const filtersearchProd=async function filtersearchProd(req,res){
    try{
        const prod=await prodData.filtersearchProd(req.params.Pname,req.cookies.AuthCookie);
        if(prod.length==0){
            res.render("prods/searchResultwrong");
        }else{
            res.render("prods/searchResult",{prods:prod});
        }
    }catch(e){
        res.status(500).json({error:e});
    }
}
app.get("prod/searchfilter/:Pname",filtersearchProd);

const getfilterSearch=function getfilterSearch(req,res){
    res.render("prods/filtersearchItem");
}
app.get("/prod/searchfilter",getfilterSearch);

const postfilterSearch=async function postfilterSearch(req,res){
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
    res.redirect(`/prod/searchfilter/${req.body.Pname}`);
}
app.post("/prod/searchfilter",postfilterSearch);


/* Static Page Configuration */
const static = express.static(__dirname + '/public');
app.use("/public", static);

/* Handlebars Configuration */
app.engine('handlebars', exphbs({ defaultLayout:'main' }));
app.set('view engine', 'handlebars');

/* Routing Configuration */
const configRoutes = require("./routes");
configRoutes(app);

/* Server is running on port 3000 */
app.listen(3000, () => {
    console.log("We've now got a server");
    console.log("Your routes will be running on http://localhost:3000");
});