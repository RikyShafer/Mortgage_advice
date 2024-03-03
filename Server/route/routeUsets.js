// // Import necessary modules
// const express = require("express");
// const router = express.Router();
// const userController = require('../controllers/userController.js');



// // Use the userController version
// router.get("/", userController.getAllUser);

// router.get("/:id", userController.getUserById);

// router.post("/", userController.createUser);
// router.put("/", userController.updateUser);


// router.delete("/", userController.deleteUser);






// // Export the router
// module.exports = router;


const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController.js');

// Use the userController version
router.get("/", userController.getAllUser);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/", userController.updateUser);
router.delete("/", userController.deleteUser);

// Export the router
module.exports = router;

