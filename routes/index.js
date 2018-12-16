const userRoutes = require("./users");
const prodRoutes = require("./prod");
const storeRoutes = require("./stores");
const adminRoutes = require("./admin");
const homeRoutes=require("./home");

const constructorMethod = app => {
  app.use("/users", userRoutes);
  app.use("/stores", storeRoutes);
  app.use("/prod", prodRoutes);
  app.use("/admin", adminRoutes);
  app.use("/", homeRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;