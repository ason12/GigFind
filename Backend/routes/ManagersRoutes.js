const express = require("express");
const router = express.Router();
const {
  getAllManagers,
  getManagerById,
  createManager,
  updateManager,
  deleteManager,
} = require("../controller/ManagersController");

// GET all managers
router.get("/", getAllManagers);

// GET single manager by ID
router.get("/:id", getManagerById);

// POST new manager
router.post("/", createManager);

// PUT/update manager
router.put("/:id", updateManager);

// DELETE manager
router.delete("/:id", deleteManager);

module.exports = router;
