// routes/fileRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "public", "uploads") );
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + "-" + file.originalname); // Corrected line
    }
});
const upload = multer({ storage: storage });
const router = express.Router();
const file  = require('../controllers/fileController');

router.post('/upload', upload.single('file') , file.uploadFile);
router.get('/upload/:id', file.getFileById);
module.exports = router;
