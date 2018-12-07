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

module.exports = router;