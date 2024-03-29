// Import necessary modules
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
const questionnaireController = require('../controllers/questionnaireController.js');


const verifyJWT = require("../middleware/verifyJWT");
const verifyAdmin = require("../middleware/verifyAdmin");


router.get("/",verifyJWT,verifyAdmin,  questionnaireController.getAllQuestionnaire);


router.get("/:id",verifyJWT,verifyAdmin, questionnaireController.getQuestionnaireById);

// router.post("/",upload.single('cpaApprovalForCurrentSub'), questionnaireController.createQuestionnaire);
// router.put("/",upload.single('cpaApprovalForCurrentSub'),  questionnaireController.updateQuestionnaire);
router.post("/", upload.fields([
    { name: 'cpaApprovalForCurrentSub', maxCount: 1 },
    { name: 'antecedentModifierMole', maxCount: 1 },
    { name: 'adiposityPreviousVariables1', maxCount: 1 },
    { name: 'adiposityPreviousVariables2', maxCount: 1 },
    { name: 'firstNetSlip', maxCount: 1 },
    { name: 'secondNetSlip', maxCount: 1 },
    { name: 'thirdNetSlip', maxCount: 1 }
]), questionnaireController.createQuestionnaire);

router.put("/", upload.fields([
    { name: 'cpaApprovalForCurrentSub', maxCount: 1 },
    { name: 'antecedentModifierMole', maxCount: 1 },
    { name: 'adiposityPreviousVariables1', maxCount: 1 },
    { name: 'adiposityPreviousVariables2', maxCount: 1 },
    { name: 'firstNetSlip', maxCount: 1 },
    { name: 'secondNetSlip', maxCount: 1 },
    { name: 'thirdNetSlip', maxCount: 1 }
]), questionnaireController.updateQuestionnaire);

router.delete("/",verifyJWT,verifyAdmin, questionnaireController.deleteQuestionnaire);


// Export the router
module.exports = router;
