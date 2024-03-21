

const express = require("express");
const router = express.Router();
const contactController = require('../controllers/contactController.js');

// Use the userController version
router.get("/", contactController.getAllContact);
router.get("/:id", contactController.getContactById);
router.post("/", contactController.createContact);
router.put("/", contactController.updateContact);
router.delete("/", contactController.deleteContact);

// Export the router
module.exports = router;

