// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
// const User = require("../models/UserRegister")

// const login = async (req, res) => {
//     const { firstName, password,email } = req.body

//     if (!firstName || !password, !email) {
//         return res.status(401).json({
//             error: true,
//             message: " userName, password email are required",
//             data: null
//         });
//     }
//     const foundUser = await User.findOne({ firstName: firstName, deleted: false, email:email}).lean()

//     if (!foundUser) {
//         return res.status(401).json({
//             error: true,
//             message: " Unauthorized  foundUser ",
//             data: null
//         });
//     }
//     const match = await bcrypt.compare(password, foundUser.password)

//     if (!match) {
//         return res.status(401).json({
//             error: true,
//             message: " Unauthorized  foundUser ",
//             data: null
//         });
//     }

//     const userInfo = {
//         _id: userRegister._id,
//         firstName: userRegister.firstName,
//         lastName: userRegister.lastName,
//         email: userRegister.email,
//         phone: userRegister.phone
//     }
//     const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
//     const refreshToken = jwt.sign({ email: userRegister.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
//     res.cookie("jwt", refreshToken, {
//         httpOnly: true,
//         maxAge: 7 * 24 * 60 * 60 * 100
//     })
// console.log(accessToken);
//     res.json(accessToken)
// }

const User = require("../models/UserRegister")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');

async function sendEmailToManager(firstName, lastName, email,phone) {
    const websiteUrl = 'http://localhost:3000'; // Replace this with your website URL
    console.log(firstName);
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
            subject: 'לקוח חדש הצטרף לרשימת הלקחות ',
            html: `
                <p  style="direction: rtl; font-family: 'Arial', sans-serif; font-size: 16px; margin-bottom:100px;">
                    שפר פרטי: ${firstName}<br>
                    שם משפחה: ${lastName}<br>
                    מייל : ${email}<br>
                    טלפון : ${phone}
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
const login = async (req, res) => {
    const { firstName, password, email } = req.body

    if (!firstName || !password || !email) {
        return res.status(401).json({
            error: true,
            message: "userName, password, and email are required",
            data: null
        });
    }
    const foundUser = await User.findOne({ firstName: firstName, deleted: false, email: email }).lean()

    if (!foundUser) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized: User not found",
            data: null
        });
    }
    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized: Incorrect password",
            data: null
        });
    }

    const userInfo = {
        _id: foundUser._id,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        phone: foundUser.phone,
        roles: foundUser.roles,
        image: foundUser.image,
        active: foundUser.active
    }
    console.log(userInfo);
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    const refreshToken = jwt.sign({ email: foundUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // corrected typo in maxAge value
    })
    console.log(accessToken);
    res.json({ accessToken }); // wrap accessToken in an object for clarity
}

const refresh = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized: No refreshToken",
            data: null
        })
    }
    const refreshToken = cookies.jwt

    jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decode) => {
            if (err) {
                return res.status(403).json({
                    error: true,
                    message: "Forbidden: Invalid refresh token",
                    data: null
                })
            }


            const foundUser = await User.findOne({ email: decode.email, deleted: false } ).lean(); // Find user by email

            if (!foundUser) {
                return res.status(401).json({
                    error: true,
                    message: "Unauthorized: User not found",
                    data: null
                });
            }
            const userInfo = {
                _id: foundUser._id,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                email: foundUser.email,
                phone: foundUser.phone,
                roles: foundUser.roles,
                image: foundUser.image,
                active:foundUser.active
            };

            const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })

            res.json({ accessToken })
        })

}

// const refresh = async (req, res) => {
//     const refreshToken = req.cookies && req.cookies.jwt; // Check if req.cookies is defined before accessing jwt

//     if (!refreshToken) {
//         return res.status(401).json({
//             error: true,
//             message: "Unauthorized: No refreshToken",
//             data: null
//         });
//     }

//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decode) => {
//         if (err) {
//             return res.status(403).json({
//                 error: true,
//                 message: "Forbidden: Invalid refresh token",
//                 data: null
//             });
//         }

//         const foundUser = await User.findOne({ firstName: firstName, deleted: false, email:email}).lean()

//         if (!foundUser) {
//             return res.status(401).json({
//                 error: true,
//                 message: "Unauthorized: User not found",
//                 data: null
//             });
//         }

//         const userInfo = {
//             _id: userRegister._id,
//             firstName: userRegister.firstName,
//             lastName: userRegister.lastName,
//             email: userRegister.email,
//             phone: userRegister.phone,
//             roles: userRegister.roles

//         }

//         const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
//         res.json(accessToken);
//     });
// };
const logout = async(req, res) =>{
    const cookies = req.cookies
    if(!cookies?.jwt){
        return res.status(204).json({
            error: true,
            message: "No Content",
            data: null
        })
    }
    res.clearCookie("jwt",  {
        httpOnly: true
    })
    res.json({
        error: false,
        message: "Cookie Cleard",
        data: null
    })
}
const registeration = async (req, res) => {
    const image = req.file?.filename || ""; // Handle file upload

    const {
        firstName,
        lastName,
        password,
        email,
        phone,
        anotherQuestion
    } = req.body;

    // Check if required fields are provided
    if (!firstName || !password || !lastName || !email || !phone) {
        return res.status(400).json({
            error: true,
            message: 'firstName, lastName, password, email, and phone are required',
            data: null
        });
    }

    try {
        // Check if email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                error: true,
                message: 'Email must be unique',
                data: null
            });
        }

        // Hash the password
        const hashedPwd = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
            firstName,
            lastName,
            password: hashedPwd,
            email,
            phone,
            image,
            anotherQuestion
        });
        await user.save();

        await sendEmailToManager(firstName, lastName, email,phone);//שליחת מייל 

        // Generate JWT tokens
        const accessToken = jwt.sign(
            {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                image: user.image,
                active:user.active
              },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        // Set refresh token in cookie
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Respond with access token and user data
        res.json({
            accessToken,
            user
        });
    } catch (error) {
        // Handle errors
        console.error('Error during registration:', error);
        res.status(500).json({
            error: true,
            message: 'Internal server error',
            data: null
        });
    }
};

module.exports = { login, refresh, logout, registeration }


