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
        roles: foundUser.roles
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
// const refresh = async (req, res) => {
//     const refreshToken = req.cookies.jwt;
    
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
const refresh = async (req, res) => {
    const refreshToken = req.cookies && req.cookies.jwt; // Check if req.cookies is defined before accessing jwt
    
    if (!refreshToken) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized: No refreshToken",
            data: null
        });
    }
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decode) => {
        if (err) {
            return res.status(403).json({
                error: true,
                message: "Forbidden: Invalid refresh token",
                data: null
            });
        }
        
        const { email } = decode; // Retrieve email from decoded token
        
        const foundUser = await User.findOne({ email: email, deleted: false }).lean(); // Find user by email
        
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
            roles: foundUser.roles
        };
        
        const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        res.json(accessToken);
    });
};


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
const logout=async (req,res)=>{
    const cookies = req.cookies;
    if (!cookies) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized: cookies",
            data: null
        });
    }

    res.clearCookie("jwt", {
        httpOnly:true
    })

    res.json({
        error: false,
        message: "Cookie clear",
        data: null
    }
    )

}

const registeration = async (req, res) => {
    // פירוק נתוני משתמש מגוף הבקשה
    const {
        firstName,
        lastName,
        password,
        email,
        phone,
        anotherQuestion
    } = req.body;
    console.log( firstName,lastName,password,email,phone,anotherQuestion);
    if (!firstName || !password || !lastName || !email || !phone) {
        return res.status(401).json({
            error: true,
            message: 'firstName || password || lastName || email || phone  are required',
            data: null
        })
    }
  
    // אימות: בדיקה אם המייל  כבר קיים במערכת
    const existingUseremail = await User.findOne({ email: email });
    if (existingUseremail) {
        return res.status(400).json({
            error: true,
            message: ' email must be unique',
            data: null
        })
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    try {
        //  צור משתמש חדש באמצעות מודל המשתמש והנתונים שסופקו
        const userRegister = await User.create({
            firstName,
            lastName,
            password: hashedPwd,
            email,
            phone,
            anotherQuestion
        });
        console.log(userRegister);


        const userInfo = {
            _id: userRegister._id,
            firstName: userRegister.firstName,
            lastName: userRegister.lastName,
            email: userRegister.email,
            phone: userRegister.phone,
            userRegister
        }
        const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
        const refreshToken = jwt.sign({ email: userRegister.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 100
        })
        console.log(accessToken);

        const useraccessToken = {
            accessToken: accessToken,
            userRegister: userRegister

        }
        res.json(useraccessToken)
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

module.exports = { login , refresh, logout, registeration}

