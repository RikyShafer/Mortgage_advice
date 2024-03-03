// Import necessary modules
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Create an Express router
const router = express.Router();

// User registration endpoint
router.post('/register', async (req, res) => {
//     try {
//         const { name, username, password, email } = req.body;

//         // Check if the username and email are unique
//         const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Username or email already exists' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const newUser = new User({ name, username, password: hashedPassword, email });
//         await newUser.save();

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

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
 const existingUser = await User.findOne({ username: username.toLowerCase() });
 if (existingUser) {
     return res.status(400).json({ message: 'Username already exists', error: { username: 'Username must be unique' } });
 }
 // אימות: בדיקה אם המייל  כבר קיים במערכת
 const eemailUser = await User.findOne({ email: email.toLowerCase() });
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
     const user = await User.create({
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
});


// User authentication endpoint
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
