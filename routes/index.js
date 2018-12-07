const userRoutes = require("./users");
const prodRoutes = require("./prod");
const storeRoutes = require("./stores");

const constructorMethod = app => {
  app.use("/users", userRoutes);
  app.use("/stores", storeRoutes);
  app.use("/prod", prodRoutes);
  app.use("/admin", adminRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
