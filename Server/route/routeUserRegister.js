


const express = require("express");
const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "public", "image") );
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + "-" + file.originalname); // Corrected line
    }
});

const upload = multer({ storage: storage });
const router = express.Router();
const userRegisterController = require('../controllers/userRegisterController.js');
const verifyJWT = require("../middleware/verifyJWT");
const verifyAdmin = require("../middleware/verifyAdmin");

// router.use(verifyJWT);
// router.use(verifyAdmin);
router.get("/", verifyJWT,verifyAdmin,userRegisterController.getAllUserRegister);
router.get("/:id", verifyJWT,verifyAdmin,userRegisterController.getUserRegisterById);
router.post("/" , upload.single('image') , userRegisterController.addUserRegister);
router.put("/" , [verifyJWT, upload.single('image')], userRegisterController.updateUserRegister);
router.delete("/",verifyJWT,verifyAdmin, userRegisterController.deleteUserRegister);

// Export the router
module.exports = router;

