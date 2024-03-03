// ייבא מודולים נדרשים ואת מודל המשתמש
const { json, text } = require("express");
const users = require("../models/User");
const bcrypt =require("bcrypt")

// פונקציית אסינכרון ליצירת משתמש חדש
const createUser = async (req, res) => {
    // Parse date string into a Date object
    const parsedDate = new Date(req.body.date);
    // פירוק נתוני משתמש מגוף הבקשה

    const { name,
        username,
        password,
        email,
        city,
        address,
        number,
        phone,
        CountryBirth,
        roles


    } = req.body;
    // Check if the parsed date is valid
    if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
    }
    if (!username || !password || !name) {
        return res.status(400).json({ message: 'Missing mandatory fields', error: { fields: 'Username, password, and name are required' } });
    }

    // אימות: בדיקה אם שם המשתמש כבר קיים במערכת
    const existingUser = await users.findOne({ username: username.toLowerCase() });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists', error: { username: 'Username must be unique' } });
    }
    // אימות: בדיקה אם המייל  כבר קיים במערכת
    const eemailUser = await users.findOne({ email: email.toLowerCase() });
    if (eemailUser) {
        return res.status(400).json({ message: 'email already exists', error: { username: 'email must be unique' } });
    }
    const hashedPwd = await bcrypt.hash(password, 10);


    // אימות: בדיקה האם התפקיד מתאים לרשימת האפשרויות
    if (roles && !["ADMIN", "USER"].includes(roles)) {
        return res.status(400).json({ message: 'Invalid role', error: { roles: 'Invalid role specified' } });
    }

    try {
        //         // צור משתמש חדש באמצעות מודל המשתמש והנתונים שסופקו
        const user = await users.create({
            name,
            username,
            password:hashedPwd,
            email,
            city,
            address,
            number,
            phone,
            date: parsedDate,
            CountryBirth
        });
        // החזר תגובת הצלחה עם פרטי המשתמש שנוצרו
        return res.status(201).json({ message: 'New user created', user });
    } catch (error) {
        // החזר תגובת שגיאה אם יצירת המשתמש נכשלת
        return res.status(400).json({ message: 'Invalid post', error });
    }
};

// פונקציית אסינכרון כדי לאחזר את כל המשתמשים
const getAllUser = async (req, res) => {
    try {
        // מצא את כל המשתמשים במסד הנתונים רק את האלה שהם משתמשים - לקוחות והמר לאובייקטי JavaScript רגילים
        const userList = await users.find({ roles: { $ne: 'ADMIN' }},{ password: 0, roles: 0 } ).lean();

        // בדוק אם קיימים משתמשים; אם לא, החזר מערך ריק
        if (!userList || userList.length === 0) {
            return res.status(200).json({ message: 'No user found', userList: [] });
        }

        // החזר תגובת הצלחה עם רשימת המשתמשים
        res.status(200).json(userList);
    } catch (error) {
        // החזר תגובת שגיאה אם אחזור משתמשים נכשל
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

// פונקציית אסינכרון כדי לאחזר משתמש לפי מזהה
const getUserById = async (req, res) => {
    // חלץ מזהה משתמש מפרמטרי הבקשה
    const { id } = req.params;

    /// מצא משתמש לפי מזהה והמר לאובייקט JavaScript רגיל
    const user = await users.findById(id).lean()

    // בדוק אם המשתמש קיים; אם לא, החזר תגובת שגיאה
    if (!user) {
        return res.status(400).json({ message: 'No user found' });
    }

    // החזר תגובת הצלחה עם פרטי המשתמש
    res.json(user);
}
// פונקציית אסינכרון לעדכון משתמש
const updateUser = async (req, res) => {
    // נתח מחרוזת תאריך לאובייקט Date
    const parsedDate = new Date(req.body.date);

  // גוף הבקשה לפירוק
    const { _id, name, username, password, email, city, address, number, phone, CountryBirth } = req.body;

 // בדוק אם מסופק מזהה משתמש
    if (!_id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

// בדוק אם התאריך  חוקי
    if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
    }

       // אימות: בדיקה אם שם המשתמש כבר קיים במערכת
const existingUser = await users.findOne({ username: username.toLowerCase() });
    if (existingUser && existingUser._id.toString() !== _id) {
        return res.status(400).json({ message: 'Username already exists', error: { username: 'Username must be unique' } });
    }

        // אימות: בדיקה אם המייל  כבר קיים במערכת
const emailUser = await users.findOne({ email: email.toLowerCase() });
    if (emailUser && emailUser._id.toString() !== _id) {
        return res.status(400).json({ message: 'Email already exists', error: { email: 'Email must be unique' } });
    }

    try {
// גיבש את הסיסמה אם סופקת סיסמה חדשה
        let hashedPwd;
        if (password) {
            hashedPwd = await bcrypt.hash(password, 10);
        }

        // בנה את אובייקט העדכון
        const updateObj = {
            name,
            username,
            email,
            city,
            address,
            number,
            phone,
            date: parsedDate,
            CountryBirth
        };
// הוסף סיסמה מגובבת לאובייקט העדכון אם סופק
        if (hashedPwd) {
            updateObj.password = hashedPwd;
        }

// מצא ועדכן את המשתמש לפי מזהה עם הנתונים שסופקו
        const user = await users.findByIdAndUpdate(
            _id,
            updateObj,
            { new: true, runValidators: true }
        );

       // בדוק אם המשתמש לא נמצא; אם כן, החזר תגובת שגיאה
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

       // החזר תגובת הצלחה עם פרטי המשתמש המעודכנים
        res.json(`${user.name} updated`);
    } catch (error) {
        // החזר תגובת שגיאה אם עדכון המשתמש נכשל
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


const deleteUser = async (req, res) => {
    // Find and delete the User
    const { id } = req.body;
    const user = await users.findByIdAndDelete({ _id: id }).exec();

    // Send the response
    let reply;
    if (user) {
        reply = `user '${user.title}' ID ${user._id} deleted`;
    } else {
        reply = 'No such user found';
    }

    res.json(reply);
};

// ייצא את הפונקציות המוגדרות לשימוש בקבצים אחרים
module.exports = { createUser, getAllUser, getUserById, updateUser, deleteUser }

// // ID - פונקציית אסינכרון לעדכון משתמש לפי ה
// const updateUserComplete = async (req, res) => {
//     const { id } = req.params
//             // מצא את המשתמשים, אך אל תשתמש ב-lean() כאן
//     const user  = await user.findById(id).exec()
//     if (!user)
//         return res.status(400).json("user nod found...")
//           // עדכן את השדה 'השלם'
//           user.complete = !user.complete
//             // שמור את השינויים
//     await user.save()

//     res.json("succeed")

// }

