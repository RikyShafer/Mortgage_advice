// ייבא מודולים נדרשים ואת מודל המשתמש
const { json, text } = require("express");
const UserRegister = require("../models/UserRegister");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// פונקציית אסינכרון ליצירת משתמש חדש
const addUserRegister = async (req, res) => {
    // פירוק נתוני משתמש מגוף הבקשה
    const {
        firstName,
        lastName,
        password,
        email,
        phone,
        anotherQuestion

    } = req.body;

    const image = (req.file?.filename ? req.file.filename : "")

    console.log(firstName,
        lastName,
        password,
        email,
        phone,
        anotherQuestion);
    if (!firstName || !password || !lastName || !email || !phone) {
        return res.status(400).json({
            error: true,
            message: 'firstName || password || lastName || email || phone  are required',
            data: null
        })
    }


    // אימות: בדיקה אם המייל  כבר קיים במערכת
    const existingUseremail = await UserRegister.findOne({ email: email });
    if (existingUseremail) {
        return res.status(400).json({
            error: true,
            message: ' email must be unique',
            data: null
        })
    }

    //איך צורך הזה יש רק אפשרותת למייל שהוא יחודי 
    // // Retrieve all users from the database
    // const allUsers = await UserRegister.find();

    // // אימות: בדיקה אם סיסמה  כבר קיים במערכת
    // for (const user of allUsers) {
    //     const match = await bcrypt.compare(password, user.password);
    //     if (match) {
    //         return res.status(400).json({
    //             error: true,
    //             message: 'Password must be unique',
    //             data: null
    //         });
    //     }
    // }

    const hashedPwd = await bcrypt.hash(password, 10);


    try {
        //  צור משתמש חדש באמצעות מודל המשתמש והנתונים שסופקו
        const userRegister = await UserRegister.create({
            firstName,
            lastName,
            password: hashedPwd,
            email,
            phone,
            image,
            anotherQuestion,
             
        });
        console.log("userRegister",userRegister.image);

        console.log(userRegister);


        // const userInfo = {
        //     _id: userRegister._id,
        //     firstName: userRegister.firstName,
        //     lastName: userRegister.lastName,
        //     email: userRegister.email,
        //     phone: userRegister.phone
        // }
        // const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
        // const refreshToken = jwt.sign({ email: userRegister.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
        // res.cookie("jwt", refreshToken, {
        //     httpOnly: true,
        //     maxAge: 7 * 24 * 60 * 60 * 100
        // })
        // console.log(accessToken);

        // const useraccessToken = {
        //     accessToken: accessToken,
        //     userRegister: userRegister

        // }
        // res.json(useraccessToken)

        // החזר תגובת הצלחה עם פרטי המשתמש שנוצרו
        return res.status(201).json({
            error: false,
            message: "User created successfully",
            data: {
                _id: userRegister._id,
                firstName: userRegister.firstName,
                lastName: userRegister.lastName,
                email: userRegister.email
            }
        })
    
    }

    
    catch (error) {
        // החזר תגובת שגיאה אם יצירת המשתמש נכשלת
        return res.status(400).json({
            error: true,
            message: ' error',
            data: null
        })
    }
};

// פונקציית אסינכרון כדי לאחזר את כל המשתמשים
const getAllUserRegister = async (req, res) => {
    try {
        // מצא את כל המשתמשים במסד הנתונים רק את האלה שהם משתמשים - לקוחות והמר לאובייקטי JavaScript רגילים
        const userList = await UserRegister.find({ roles: { $ne: 'ADMIN' }, deleted: false, }, { password: 0, roles: 0 }).lean();

        // בדוק אם קיימים משתמשים; אם לא, החזר מערך ריק
        if (!userList || userList.length === 0) {
            return res.status(201).json({
                error: false,
                message: "No userList  ==0 ",
                data: []
            })
        }
        // החזר תגובת הצלחה עם רשימת המשתמשים
        // res.status(200).json(userList);
        res.status(201).json({
            error: false,
            message: "",
            data: userList
        })
    } catch (error) {
        // החזר תגובת שגיאה אם אחזור משתמשים נכשל
        console.error("Error adding user:", error);
        res.status(500).json({
            error: true,
            message: "Internal server error",
            data: null
        });
    }
}

// פונקציית אסינכרון כדי לאחזר משתמש לפי מזהה
const getUserRegisterById = async (req, res) => {
    // חלץ מזהה משתמש מפרמטרי הבקשה
    const { id } = req.params;

    /// מצא משתמש לפי מזהה והמר לאובייקט JavaScript רגיל
    const userRegister = await UserRegister.findById(id).lean()

    // בדוק אם המשתמש קיים; אם לא, החזר תגובת שגיאה
    if (!userRegister) {
        return res.status(400).json({
            error: true,
            message: 'No userRegister found',
            data: null
        })
    }

    // החזר תגובת הצלחה עם פרטי המשתמש
    res.status(201).json({
        error: false,
        message: "",
        data: {
            _id: userRegister._id,
            firstName: userRegister.firstName,
            lastName: userRegister.lastName,
            email: userRegister.email,
            active:userRegister.active,
            phone:userRegister.phone
        }
    })
}
// פונקציית אסינכרון לעדכון משתמש
const updateUserRegister = async (req, res) => {
    // נתח מחרוזת תאריך לאובייקט Date
    const image = (req.file?.filename ? req.file.filename : "")
console.log(req.file,);

    // גוף הבקשה לפירוק
    const { _id,
        firstName,
        lastName,
        password,
        email,
        phone,
        anotherQuestion,
        active
    } = req.body;

    // if (!_id || !firstName || !password || !lastName || !email || !phone) {
        if (!_id) {

        return res.status(400).json({
            error: true,
            // message: 'id || firstName || password || lastName || email || phone  are required',
            message: 'id   are required',

            data: null
        })
    }
    // בדוק אם מסופק מזהה משתמש
    const userRegister = await UserRegister.findById(_id);
    if (!userRegister) {
        return res
            .status(400).json({
                error: true,
                message: "no userRegister found",
                data: null
            });
    }


    // אימות: בדיקה אם המייל  כבר קיים במערכת
    const existingUseremail = await UserRegister.findOne({ email: email });
    if (existingUseremail) {
        return res.status(400).json({
            error: true,
            message: ' email must be unique',
            data: null
        })
    }
    if (password) {
        const hashpwd = await bcrypt.hash(password, 10)
        userRegister.password = hashpwd
    }



// Set firstName if it's provided, otherwise keep the existing value
userRegister.firstName = firstName ? firstName : userRegister.firstName;

// Set lastName if it's provided, otherwise keep the existing value
userRegister.lastName = lastName ? lastName : userRegister.lastName;

// Set email if it's provided, otherwise keep the existing value
userRegister.email = email ? email : userRegister.email;

// Set phone if it's provided, otherwise keep the existing value
userRegister.phone = phone ? phone : userRegister.phone;

// Set anotherQuestion if it's provided, otherwise keep the existing value
userRegister.anotherQuestion = anotherQuestion ? anotherQuestion : userRegister.anotherQuestion;

// Set active if it's provided, otherwise keep the existing value
userRegister.active = active !== undefined ? active : userRegister.active;
if (image) {
    userRegister.image = image;
}
// Save the updated userRegister
const updateUser = await userRegister.save();

    res.json({
        error: false,
        message: "",
        data: {
            _id: updateUser._id,
            firstName: updateUser.firstName,
            lastName: updateUser.lastName,
            email: updateUser.email
        }
    });
};

const deleteUserRegister = async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        return res.status(400).json({
            error: true,
            message: "id  are required",
            data: null
        })
    }
    const userRegister = await UserRegister.findById(_id)
    if (!userRegister) {
        return res.status(400).json({
            error: true,
            message: "No userRegister found",
            data: null
        })
    }
    userRegister.deleted = true

    const deletUser = await userRegister.save()
    res.status(201).json({
        error: false,
        message: '',
        data: { firstName: userRegister.firstName, _id: userRegister._id }
    })

};

// ייצא את הפונקציות המוגדרות לשימוש בקבצים אחרים
module.exports = { getAllUserRegister, addUserRegister, getUserRegisterById, updateUserRegister, deleteUserRegister }
