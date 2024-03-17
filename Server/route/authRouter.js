const express = require("express");
const multer = require('multer');

// Define storage for the uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/image'); // Save uploaded files in 'public/uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename
    }
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });
const authCountroller=require("../controllers/authCountroller")
const router =express.Router()

router.post("/login", authCountroller.login)
router.post("/registeration", upload.single('image') , authCountroller.registeration)
router.get("/refresh", authCountroller.refresh)
router.post("/logout", authCountroller.logout)

module.exports=router