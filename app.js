const express = require("express");
const app = express();
const configRoutes = require("./routes");
const bodyParser = require("body-parser");
const exphbs=require("express-handlebars");
const static = express.static(__dirname+"/prod");
app.use("/public",static);
app.use(bodyParser.urlencoded());

app.engine("handlebars",exphbs({defaultLayout:"main"}));
app.set("view engine","handlebars");

app.use(bodyParser.json());
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
