const express = require("express");
const router = express.Router();
const data = require("../data");
const adminData = data.admin;

router.get("/:id", async (req, res) => {
  try {
    const adminstrator = await adminData.getAdminById(req.params.id);
    res.json(adminstrator);
  } catch (e) {
    res.status(404).json({ error: "Adminstrator not found by id" });
  }
});

router.post("/", async (req, res) => {
  const newlyAddedAdminData = req.body;
  try {
    const { username, password, fName, lName } = newlyAddedAdminData;
    const newAdmin = await adminData.addAdmin(username, password, fName, lName);

    res.json(newAdmin);
  } catch (e) {
    res.status(500).json({ error: "Unable to add adminstrator" });
  }
});

router.get("/store/:id", async (req, res) => {
  try {
    const store = await adminData.getStoreById(req.params.id);
    res.json(store);
  } catch (e) {
    res.status(404).json({ error: "Store not found by id" });
  }
});

router.post("/store", async (req, res) => {
  const newlyAddedStoreData = req.body;
  try {
    const { storeName, address, phoneNo, email } = newlyAddedStoreData;
    const newStore = await adminData.addStore(storeName, address, phoneNo, email);

    res.json(newStore);
  } catch (e) {
    res.status(500).json({ error: "Unable to add new Store" });
  }
});

router.delete("/store/:id", async (req, res) => {
  try {
    await adminData.getStoreById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Store not found" });
  }
  try {
    await adminData.removeStore(req.params.id);
  } catch (e) {
    res.status(500).json({ error: "Cannot delete Store by id" });
  }
});
module.exports = router;
