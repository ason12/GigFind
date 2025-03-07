const express = require("express");
const router = express.Router();
const managersController = require("../controller/ManagersController");

// Create a new manager
router.post("/", managersController.create);

// Get all managers
router.get("/", managersController.getAll);

// Get manager by ID
router.get("/:id", managersController.getOne);

// Update manager
router.put("/:id", managersController.update);

// Delete manager
router.delete("/:id", managersController.delete);

module.exports = router;
