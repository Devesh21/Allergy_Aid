/* Importing all the neccessary modules */
const express = require('express');
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

/* Starting Express Server */
const app = express();

/* Body Parser Configuration */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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