// ייבא מודולים נדרשים ואת מודל המשתמש
const { json, text } = require("express");
const Questionnaire = require("../models/Questionnaire");

 // פונקציית אסינכרון ליצירת משתמש חדש
const createQuestionnaire = async (req, res) => {
    
    // const UserRegister="65e51abf4bdbd5dc80e75f8d"

    // פירוק נתוני משתמש מגוף הבקשה
    const {
        UserRegister,
        ID,//: 'תעודת זהות',
        maritalStatus,//: 'מצב משפחתי',
        education,//: 'השכלה',
        hometown,//: 'עיר מגורים',
        address,//: 'כתובת מגורים',
        postalCode,//: 'מיקוד',
        age,//: 'גיל',
        theirNativeNumber,//: 'מספר ילדים מתחת לגיל 18',
        passport,//: 'דרכון' ,
        foreignCitizenship,//: 'אזרחות זרה',
        proximityPublicFigure,//: 'קרבה לאיש ציבור',
        employment,//: 'תעסוקה',
        job,//: 'מקום עבודה',
        jobTitle,//: 'תפקיד בעבודה',
        seniority,//: 'וותק',
        previousWorkplace,//: 'מקום עבודה קודם',
        averageIncome
    } = req.body;


    const roCertificateIssueDteles = req.body.roCertificateIssueDteles ? new Date(req.body.roCertificateIssueDteles) : new Date();
    const dateBirth = req.body.dateBirth ? new Date(req.body.dateBirth) : new Date();
    const validityOfApprovalOfCPAFromPreviousYear = req.body.validityOfApprovalOfCPAFromPreviousYear ? new Date(req.body.validityOfApprovalOfCPAFromPreviousYear) : new Date();


        // Extract file names from uploaded files
        const cpaApprovalForCurrentSub = req.files?.cpaApprovalForCurrentSub?.[0]?.filename || req.body.cpaApprovalForCurrentSub;
        const antecedentModifierMole = req.files?.antecedentModifierMole?.[0]?.filename || req.body.antecedentModifierMole;
        const adiposityPreviousVariables1 = req.files?.adiposityPreviousVariables1?.[0]?.filename || req.body.adiposityPreviousVariables1;
        const adiposityPreviousVariables2 = req.files?.adiposityPreviousVariables2?.[0]?.filename || req.body.adiposityPreviousVariables2;
        const firstNetSlip = req.files?.firstNetSlip?.[0]?.filename || req.body.firstNetSlip;
        const secondNetSlip = req.files?.secondNetSlip?.[0]?.filename || req.body.secondNetSlip;
        const thirdNetSlip = req.files?.thirdNetSlip?.[0]?.filename || req.body.thirdNetSlip;

        // const antecedentModifierMole = (req.files.antecedentModifierMole && req.files.antecedentModifierMole[0]?.filename) ? req.files.antecedentModifierMole[0].filename : "";
//    const adiposityPreviousVariables1 = (req.files.adiposityPreviousVariables1 && req.files.adiposityPreviousVariables1[0]?.filename) ? req.files.adiposityPreviousVariables1[0].filename : "";
//    const adiposityPreviousVariables2 = (req.files.adiposityPreviousVariables2 && req.files.adiposityPreviousVariables2[0]?.filename) ? req.files.adiposityPreviousVariables2[0].filename : "";
//    const firstNetSlip = (req.files.firstNetSlip && req.files.firstNetSlip[0]?.filename) ? req.files.firstNetSlip[0].filename : "";
//    const secondNetSlip = (req.files.secondNetSlip && req.files.secondNetSlip[0]?.filename) ? req.files.secondNetSlip[0].filename : "";
//    const thirdNetSlip = (req.files.thirdNetSlip && req.files.thirdNetSlip[0]?.filename) ? req.files.thirdNetSlip[0].filename : "";
 console.log(req.files);

    // // Check if the parsed date is valid
    if (isNaN(roCertificateIssueDteles.getTime()) || isNaN(dateBirth.getTime()) || isNaN(validityOfApprovalOfCPAFromPreviousYear.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
    }

    try {
        //         // צור משתמש חדש באמצעות מודל המשתמש והנתונים שסופקו
        const questionnaire = await Questionnaire.create({
            UserRegister,//שייך לאיזה משתמש 
            ID,//: 'תעודת זהות',
            roCertificateIssueDteles,//תאריך הנ]פקת תעושה זהות 
            dateBirth,//תאירך לידה 
            maritalStatus,//: 'מצב משפחתי',
            education,//: 'השכלה',
            hometown,//: 'עיר מגורים',
            address,//: 'כתובת מגורים',
            postalCode,//: 'מיקוד',
            age,//: 'גיל',
            theirNativeNumber,//: 'מספר ילדים מתחת לגיל 18',
            passport,//: 'דרכון' ,
            foreignCitizenship,//: 'אזרחות זרה',
            proximityPublicFigure,//: 'קרבה לאיש ציבור',
            employment,//: 'תעסוקה',
            job,//: 'מקום עבודה',
            jobTitle,//: 'תפקיד בעבודה',
            seniority,//: 'וותק',
            previousWorkplace,//: 'מקום עבודה קודם',
            cpaApprovalForCurrentSub,//: 'אישור רו"ח משנה נוכחית י',
            validityOfApprovalOfCPAFromPreviousYear,//: 'תוקפו של אישור ',
            antecedentModifierMole,//: 'אישור רו"ח משנה קודמת  ',
            adiposityPreviousVariables1,//: 'שמה משנה קודמת ',
            adiposityPreviousVariables2,//: 'שמה משתנים  קודמת ',
            firstNetSlip,//: '  תלוש נטו ראשון ',
            secondNetSlip,//: 'תלוש נטו שני ',
            thirdNetSlip,//: 'תלוש נטו שלישי  ',
            averageIncome,//: 'הכנסה ממוצעת'

        });
        console.log(questionnaire);
        // החזר תגובת הצלחה עם פרטי המשתמש שנוצרו
        return res.status(201).json({ message: 'New questionnaire created', questionnaire });
    } catch (error) {
        console.log(error+"!!!!");
        // החזר תגובת שגיאה אם יצירת המשתמש נכשלת
        return res.status(400).json({ message: 'Invalid post', error });
    }
};
// פונקציית אסינכרון כדי לאחזר את כל המשתמשים
const getAllQuestionnaire = async (req, res) => {
    try {
        // מצא את כל המשתמשים במסד הנתונים רק את האלה שהם משתמשים - לקוחות והמר לאובייקטי JavaScript רגילים
        const questionnaireList = await Questionnaire.find().populate("UserRegister").lean();

        // בדוק אם קיימים משתמשים; אם לא, החזר מערך ריק
        if (!questionnaireList || questionnaireList.length === 0) {
            return res.status(200).json({ message: 'No questionnaireList found', questionnaireList: [] });
        }

        // החזר תגובת הצלחה עם רשימת המשתמשים
        res.status(200).json(questionnaireList);
    } catch (error) {
        // החזר תגובת שגיאה אם אחזור משתמשים נכשל
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

// פונקציית אסינכרון כדי לאחזר משתמש לפי מזהה
const getQuestionnaireById = async (req, res) => {
    // חלץ מזהה משתמש מפרמטרי הבקשה
    const { _id } = req.params;

    /// מצא משתמש לפי מזהה והמר לאובייקט JavaScript רגיל
    const questionnaire = await Questionnaire.findById(_id).lean()

    // בדוק אם המשתמש קיים; אם לא, החזר תגובת שגיאה
    if (!questionnaire) {
        return res.status(400).json({ message: 'No questionnaire found' });
    }

    // החזר תגובת הצלחה עם פרטי המשתמש
    res.json(questionnaire);
}
// פונקציית אסינכרון לעדכון משתמש
const updateQuestionnaire = async (req, res) => {
    // נתח מחרוזת תאריך לאובייקט Date
    const roCertificateIssueDteles = new Date(req.body.roCertificateIssueDteles);
    const dateBirth = new Date(req.body.dateBirth);
    const  validityOfApprovalOfCPAFromPreviousYear= new Date(req.body.validityOfApprovalOfCPAFromPreviousYear);
    //: 'תוקפו של אישור ',


    // גוף הבקשה לפירוק
    const { _id,
        UserRegister,//שייך לאיזה משתמש 
        ID,//: 'תעודת זהות',
        maritalStatus,//: 'מצב משפחתי',
        education,//: 'השכלה',
        hometown,//: 'עיר מגורים',
        address,//: 'כתובת מגורים',
        postalCode,//: 'מיקוד',
        age,//: 'גיל',
        theirNativeNumber,//: 'מספר ילדים מתחת לגיל 18',
        passport,//: 'דרכון' ,
        foreignCitizenship,//: 'אזרחות זרה',
        proximityPublicFigure,//: 'קרבה לאיש ציבור',
        employment,//: 'תעסוקה',
        job,//: 'מקום עבודה',
        jobTitle,//: 'תפקיד בעבודה',
        seniority,//: 'וותק',
        previousWorkplace,//: 'מקום עבודה קודם',
        // cpaApprovalForCurrentSub,//: 'אישור רו"ח משנה נוכחית י',
        // validityOfApprovalOfCPAFromPreviousYear,//: 'תוקפו של אישור ',
        // antecedentModifierMole,//: 'אישור רו"ח משנה קודמת  ',
        // adiposityPreviousVariables1,//: 'שמה משנה קודמת ',
        // adiposityPreviousVariables2,//: 'שמה משתנים  קודמת ',

        // firstNetSlip,//: '  תלוש נטו ראשון ',
        // secondNetSlip,//: 'תלוש נטו שני ',
        // thirdNetSlip,//: 'תלוש נטו שלישי  ',
        averageIncome,//: 'הכנסה ממוצעת'
    } = req.body;
    const cpaApprovalForCurrentSub = (req.file?.filename ? req.file.filename : "")//: 'אישור רו"ח משנה נוכחית י',
    const antecedentModifierMole = (req.file?.filename ? req.file.filename : "")//: 'אישור רו"ח משנה קודמת  ',

    const adiposityPreviousVariables1 = (req.file?.filename ? req.file.filename : "")//: 'שמה משנה קודמת ',
    const adiposityPreviousVariables2 = (req.file?.filename ? req.file.filename : "")//: 'שמה משתנים  קודמת ',
    const firstNetSlip = (req.file?.filename ? req.file.filename : "")//: '  תלוש נטו ראשון ',
    const secondNetSlip = (req.file?.filename ? req.file.filename : "")//: 'תלוש נטו שני ',
    const thirdNetSlip = (req.file?.filename ? req.file.filename : "")//: 'הכנסה ממוצעת'

    // בדוק אם מסופק מזהה משתמש
    if (!_id) {
        return res.status(400).json({ message: 'questionnaire ID is required' });
    }

    // בדוק אם התאריך  חוקי
    if (isNaN(roCertificateIssueDteles.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
    }

    if (isNaN(dateBirth.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
    }
    if (isNaN(validityOfApprovalOfCPAFromPreviousYear.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
    }
    try {

        // בנה את אובייקט העדכון
        const updateObj = {
            UserRegister,//שייך לאיזה משתמש 
            ID,//: 'תעודת זהות',
            roCertificateIssueDteles,//תאריך הנ]פקת תעושה זהות 
            dateBirth,//תאירך לידה 
            maritalStatus,//: 'מצב משפחתי',
            education,//: 'השכלה',
            hometown,//: 'עיר מגורים',
            address,//: 'כתובת מגורים',
            postalCode,//: 'מיקוד',
            age,//: 'גיל',
            theirNativeNumber,//: 'מספר ילדים מתחת לגיל 18',
            passport,//: 'דרכון' ,
            foreignCitizenship,//: 'אזרחות זרה',
            proximityPublicFigure,//: 'קרבה לאיש ציבור',
            employment,//: 'תעסוקה',
            job,//: 'מקום עבודה',
            jobTitle,//: 'תפקיד בעבודה',
            seniority,//: 'וותק',
            previousWorkplace,//: 'מקום עבודה קודם',
            cpaApprovalForCurrentSub,//: 'אישור רו"ח משנה נוכחית י',
            validityOfApprovalOfCPAFromPreviousYear,//: 'תוקפו של אישור ',
            antecedentModifierMole,//: 'אישור רו"ח משנה קודמת  ',
            adiposityPreviousVariables1,//: 'שמה משנה קודמת ',
            adiposityPreviousVariables2,//: 'שמה משתנים  קודמת ',
            firstNetSlip,//: '  תלוש נטו ראשון ',
            secondNetSlip,//: 'תלוש נטו שני ',
            thirdNetSlip,//: 'תלוש נטו שלישי  ',
            averageIncome,//: 'הכנסה ממוצעת'
        };
        // הוסף סיסמה מגובבת לאובייקט העדכון אם סופק


        // מצא ועדכן את המשתמש לפי מזהה עם הנתונים שסופקו
        const questionnaire = await Questionnaire.findByIdAndUpdate(
            _id,
            updateObj,
            { new: true, runValidators: true }
        );

        // בדוק אם המשתמש לא נמצא; אם כן, החזר תגובת שגיאה
        if (!questionnaire) {
            return res.status(404).json({ message: 'questionnaire not found' });
        }

        // החזר תגובת הצלחה עם פרטי המשתמש המעודכנים
        res.json(`${questionnaire.firstName} updated`);
    } catch (error) {
        // החזר תגובת שגיאה אם עדכון המשתמש נכשל
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const deleteQuestionnaire = async (req, res) => {
    // Find and delete the Questionnaire
    const { _id } = req.body; // Use req.params to get the ID from the URL parameter
    try {
        const questionnaire = await Questionnaire.findByIdAndDelete(_id).exec(); // Use id directly to find and delete the questionnaire

        // Send the response
        let reply;
        if (questionnaire) {
            reply = `Questionnaire '${questionnaire.firstName}' with ID ${questionnaire._id} deleted`; // Access questionnaire._id instead of user._id
        } else {
            reply = 'No such questionnaire found';
        }

        res.json(reply);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
// // ייצא את הפונקציות המוגדרות לשימוש בקבצים אחרים
module.exports = { createQuestionnaire, getAllQuestionnaire, getQuestionnaireById, updateQuestionnaire, deleteQuestionnaire }
