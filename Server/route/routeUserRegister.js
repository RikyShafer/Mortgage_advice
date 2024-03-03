
const express = require("express");
const router = express.Router();
const userRegisterController = require('../controllers/userRegisterController.js');
const verifyJWT = require("../middleware/verifyJWT");
const verifyAdmin = require("../middleware/verifyAdmin");

// router.use(verifyJWT);
// router.use(verifyAdmin);
router.get("/", verifyJWT,verifyAdmin,userRegisterController.getAllUserRegister);
router.get("/:id", verifyJWT,verifyAdmin,userRegisterController.getUserRegisterById);
router.post("/", userRegisterController.addUserRegister);
router.put("/",verifyJWT,verifyAdmin, userRegisterController.updateUserRegister);
router.delete("/",verifyJWT,verifyAdmin, userRegisterController.deleteUserRegister);

// Export the router
module.exports = router;

