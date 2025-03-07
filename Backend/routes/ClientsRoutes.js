const express = require("express");
const router = express.Router();
const ClientsController = require("../controller/ClientsController");

// Create a new client
router.post("/", ClientsController.create);

// Get all clients
router.get("/", ClientsController.getAll);

// Get client by ID
router.get("/:id", ClientsController.getOne);

// Update client
router.put("/:id", ClientsController.update);

// Delete client
router.delete("/:id", ClientsController.delete);

module.exports = router;
