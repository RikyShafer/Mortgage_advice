// ייבא מודולים נדרשים ואת מודל המשתמש
const { json, text } = require("express");
const Contact = require("../models/Contact");
const nodemailer = require('nodemailer');

async function sendEmailToManager(name, email, message, phone) {
    const websiteUrl = 'http://localhost:3000'; // Replace this with your website URL
    try {
        // Create a Nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USERNAME_EMAIL,
                pass: process.env.PASSWORD_EMAIL,
            },
            tls: {
                rejectUnauthorized: false 
            }
        });

        // HTML content for the email with a button linking to your website
        let mailOptions = {
            from: process.env.EMAIL,
            to:  process.env.EMAIL,
            subject: 'New Contact Form Submission',
            html: `
                <p  style="direction: rtl; font-family: 'Arial', sans-serif; font-size: 16px; margin-bottom:100px;">
                    Name: ${name}<br>
                    Email: ${email}<br>
                    Phone: ${phone}<br>
                    Message: ${message}
                </p>
                <p style="text-align: right;">
                    <a href="${websiteUrl}" style="padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px;">בקר באתר</a>
                </p>
            `,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            // Handle authentication errors
            if (error.code === 'EAUTH') {
                console.error('Invalid login credentials. Please check your Gmail username and password.');
            }
        }
    } catch (error) {
        console.error('Error creating transporter:', error);
    }
}
// פונקציית אסינכרון ליצירת משתמש חדש
const createContact = async (req, res) => {
    const { name, email, phone, message } = req.body;
    
    if (!email || !phone || !name) {
        return res.status(400).json({ message: 'Missing mandatory fields', error: { fields: 'name, email, and phone are required' } });
    }

    try {
        const contact = await Contact.create({ name, email, phone, message });
        await contact.save();
        await sendEmailToManager(name, email, message,phone);
        return res.status(201).json({ message: 'New contact created', contact });
    } catch (error) {
        console.error('Error creating contact:', error);
        return res.status(500).json({ message: 'Error creating contact', error });
    }
};

// פונקציית אסינכרון כדי לאחזר את כל המשתמשים
const getAllContact = async (req, res) => {
    try {
        // מצא את כל המשתמשים במסד הנתונים רק את האלה שהם משתמשים - לקוחות והמר לאובייקטי JavaScript רגילים
        const contactList = await Contact.find( ).lean();

        // בדוק אם קיימים משתמשים; אם לא, החזר מערך ריק
        if (!contactList || contactList.length === 0) {
            return res.status(200).json({ message: 'No contactList found', contactList: [] });
        }

        // החזר תגובת הצלחה עם רשימת המשתמשים
        res.status(200).json(contactList);
    } catch (error) {
        // החזר תגובת שגיאה אם אחזור משתמשים נכשל
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

// פונקציית אסינכרון כדי לאחזר משתמש לפי מזהה
const getContactById = async (req, res) => {
    // חלץ מזהה משתמש מפרמטרי הבקשה
    const { id } = req.params;

    /// מצא משתמש לפי מזהה והמר לאובייקט JavaScript רגיל
    const contact = await Contact.findById(id).lean()

    // בדוק אם המשתמש קיים; אם לא, החזר תגובת שגיאה
    if (!contact) {
        return res.status(400).json({ message: 'No contact found' });
    }

    // החזר תגובת הצלחה עם פרטי המשתמש
    res.json(contact);
}
// פונקציית אסינכרון לעדכון משתמש
const updateContact = async (req, res) => {
  

  // גוף הבקשה לפירוק
    const { _id, name,  email, phone ,message } = req.body;

 // בדוק אם מסופק מזהה משתמש
    if (!_id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
// גיבש את הסיסמה אם סופקת סיסמה חדשה
       
        // בנה את אובייקט העדכון
        const updateObj = {
            name,
            email,
            phone,
           message
        };
// מצא ועדכן את המשתמש לפי מזהה עם הנתונים שסופקו
        const contact = await Contact.findByIdAndUpdate(
            _id,
            updateObj,
            { new: true, runValidators: true }
        );

       // בדוק אם המשתמש לא נמצא; אם כן, החזר תגובת שגיאה
        if (!contact) {
            return res.status(404).json({ message: 'contact not found' });
        }

       // החזר תגובת הצלחה עם פרטי המשתמש המעודכנים
        res.json(`${contact.name} updated`);
    } catch (error) {
        // החזר תגובת שגיאה אם עדכון המשתמש נכשל
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


const deleteContact = async (req, res) => {
    // Find and delete the User
    const { id } = req.body;
    const contact = await Contact.findByIdAndDelete({ _id: id }).exec();

    // Send the response
    let reply;
    if (contact) {
        reply = `contact '${contact.title}' ID ${contact._id} deleted`;
    } else {
        reply = 'No such user found';
    }

    res.json(reply);
};



       
// ייצא את הפונקציות המוגדרות לשימוש בקבצים אחרים
module.exports = { createContact, getAllContact, getContactById, updateContact, deleteContact }


