// // const express = require('express');
// // const passport = require('passport'); // Import passport

// // const router = express.Router();

// // router.get('/auth/google',
// //     passport.authenticate('google', { scope: ['profile', 'email'] })
// // );

// // router.get('/auth/google/callback',
// //     passport.authenticate('google', { failureRedirect: '/error' }),
// //     (req, res) => {
// //         res.redirect('/'); // Redirect to the home page or success page
// //     }
// // );

// // router.get('/error', (req, res) => {
// //     res.send("Error logging in");
// // });

// // module.exports = router;
// const express = require('express');
// const passport = require('passport');
// const router = express.Router();
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const User = require('./models/UserRegister'); // Adjust this to your User model

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// const CALLBACK_URL = "http://localhost:3297/auth/google/callback"; // Adjust as needed

// // // Configure the Google OAuth strategy
// // passport.use(new GoogleStrategy({
// //     clientID: GOOGLE_CLIENT_ID,
// //     clientSecret: GOOGLE_CLIENT_SECRET,
// //     callbackURL: CALLBACK_URL
// // }, async (accessToken, refreshToken, profile, done) => {
// //     try {
// //         let user = await User.findOne({ googleId: profile.id });
// //         if (!user) {
// //             // Create a new user if not found
// //             user = new User({
// //                 googleId: profile.id,
// //                 email: profile.emails[0].value,
// //                 firstName: profile.name.givenName,
// //                 lastName: profile.name.familyName,
// //                 image:profile.photos[0].value
// //             });
// //             await user.save();
// //         }
// //         return done(null, user); // Pass the user object to serializeUser
// //     } catch (err) {
// //         return done(err); // Handle errors
// //     }
// // }));

// // // Serialize user object to maintain session
// // passport.serializeUser((user, done) => {
// //     done(null, user.id);
// // });
// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: CALLBACK_URL
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         let user = await User.findOne({ googleId: profile.id });
//         if (!user) {
//             // בדוק אם הערך של password ריק
//             if (!profile.password || profile.password.trim() === "") {
//                 profile.password = generateRandomPassword(); // פונקציה שתייצר סיסמא אקראית
//             }

//             user = new User({
//                 googleId: profile.id,
//                 email: profile.emails[0].value,
//                 firstName: profile.name.givenName,
//                 lastName: profile.name.familyName,
//                 image: profile.photos[0].value,
//                 password: profile.password // הוסף סיסמה אם אין
//             });
//             await user.save();
//         }
//         return done(null, user); // Pass the user object to serializeUser
//     } catch (err) {
//         return done(err); // Handle errors
//     }
// }));
// function generateRandomPassword() {
//     return Math.random().toString(36).slice(-8); // מחזיר מחרוזת אקראית באורך 8
// }
// // Deserialize user from session
// // passport.deserializeUser(async (id, done) => {
// //     try {
// //         const user = await User.findById(id);
// //         done(null, user);
// //     } catch (err) {
// //         done(err, null);
// //     }
// // });
// passport.serializeUser((user, done) => {
//     done(null, user.id); // או כל מזהה ייחודי אחר של המשתמש
//   });


// // Google OAuth authentication route
// router.get('/auth/google', passport.authenticate('google', {
//     scope: ['profile', 'email']
// }));


// router.get('/auth/google/callback',
//     passport.authenticate('google', {
//         successRedirect: 'http://localhost:3001/', // Redirect to homepage on success
//         failureRedirect: '/error' // Redirect to error page on failure
//     })
// );
// router.get('/success', (req, res) => res.send(userProfile));

// // Error route
// router.get('/error', (req, res) => {
//     res.send("Error logging in");
// });

// module.exports = router;

// const express = require('express');
// const passport = require('passport');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const router = express.Router();
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const User = require('./models/UserRegister'); // Adjust this to your User model
// const jwt = require('jsonwebtoken');

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// const CALLBACK_URL = "http://localhost:3297/auth/google/callback"; // Adjust as needed
// const SECRET_KEY = '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'; // Replace with your actual secret key
// const REFRESH_TOKEN_EXPIRY = '7d'; // Refresh token expiry

// // Configure session middleware
// router.use(cookieParser());
// router.use(session({
//     secret: 'your_secret_here', // Replace with your own secret key
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Set secure to true if using HTTPS
// }));

// // Initialize passport
// router.use(passport.initialize());
// router.use(passport.session());

// // Configure Google OAuth strategy
// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: CALLBACK_URL
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         let user = await User.findOne({ googleId: profile.id });
//         if (!user) {
//             user = new User({
//                 googleId: profile.id,
//                 email: profile.emails[0].value,
//                 firstName: profile.name.givenName,
//                 lastName: profile.name.familyName,
//                 image: profile.photos[0].value,
//                 password: generateRandomPassword() // Adjust this function as needed
//             });
//             await user.save();
//         } else {
//             // Update user last login time or other necessary info
//             user.lastLogin = Date.now();
//             await user.save();
//         }

//         console.log("google");
//         return done(null, user); // Pass the user object to serializeUser
//     } catch (err) {
//         return done(err); // Handle errors
//     }
// }));

// // Serialize user to session
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// // Deserialize user from session
// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// });

// // Google OAuth authentication route
// router.get('/auth/google', passport.authenticate('google', {
//     scope: ['profile', 'email']
// }));

// // Callback route after Google authentication

// router.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/error', successRedirect: 'http://localhost:3001/ss' }),
//     (req, res) => {
//         console.log(req.user.email);
//         try {
//             const refreshTokenJwt = jwt.sign({ email: req.user.email }, SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRY });
//             res.cookie('jwt', refreshTokenJwt, {
//                 httpOnly: true,
//                 maxAge: 7 * 24 * 60 * 60 * 1000,
//                 secure: false, // Set secure to false for HTTP, true for HTTPS
//             });
//             console.log(refreshTokenJwt);
//             res.redirect('/success');
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//         }
//     }
// );
//   // Route: Logout
//   router.get('/logout', (req, res, next) => {
//     req.logout((err) => {
//       if (err) { return next(err); }
//       res.clearCookie('jwt'); // Clear the refresh token cookie on logout
//       res.redirect('/');
//     });
//   });
// // Handle callback and return token
// router.get('/auth/google/callback-token',
//     passport.authenticate('google', { failureRedirect: '/error' }),
//     (req, res) => {
//         try {
//             const refreshTokenJwt = jwt.sign({ email: req.user.email }, SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRY });
//             res.cookie('jwt', refreshTokenJwt, {
//                 httpOnly: true,
//                 maxAge: 7 * 24 * 60 * 60 * 1000,
//                 secure: true,
//             });

//             // Extract token from cookies
//             const token = getTokenFromCookies(req);

//             // Send token to user
//             res.json({ token });
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//         }
//     });

// // Success route (if needed)
// router.get('/success', (req, res) => {
//     try {
//         const token = getTokenFromCookies(req);
//         res.json({ 
//             token: token,
//             user: req.user 
//         });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// // Error route
// router.get('/error', (req, res) => {
//     res.send("Error logging in");
// });

// // פונקציה לקבלת ה-token מהקוקיות
// const getTokenFromCookies = (req) => {
//     const token = req.cookies.jwt;
//     if (!token) {
//         throw new Error('Token not found in cookies');
//     }
//     return token;
// };

// // מסלול להדגמה
// // Route to get the token
// router.get('/get-token', (req, res) => {
//     try {
//         const token = getTokenFromCookies(req);
//         console.log("Token from cookies:", token); // Add debug statement
//         res.json({ token });
//     } catch (error) {
//         console.error("Error getting token:", error.message); // Add debug statement
//         res.status(400).json({ error: error.message });
//     }
// });



// // New route to initiate login and return token
// router.get('/initiate-login', (req, res, next) => {
//     // Initiate Google login
//     passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
// });

// module.exports = router;

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = express.Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('./models/UserRegister'); // Adjust this to your User model
const jwt = require('jsonwebtoken');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CALLBACK_URL = "http://localhost:3297/auth/google/callback"; // Adjust as needed
const SECRET_KEY = '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'; // Replace with your actual secret key
const REFRESH_TOKEN_EXPIRY = '7d'; // Refresh token expiry

// Configure session middleware
router.use(cookieParser());
router.use(session({
    secret: GOOGLE_CLIENT_SECRET, // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if using HTTPS
}));

// Initialize passport
router.use(passport.initialize());
router.use(passport.session());

// Configure Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = new User({
                googleId: profile.id,
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value,
                password: "12345" // Adjust this function as needed
            });
            await user.save();
        } else {
            // Update user last login time or other necessary info
            user.lastLogin = Date.now();
            await user.save();
        }

        return done(null, user); // Pass the user object to serializeUser
    } catch (err) {
        return done(err); // Handle errors
    }
}));

// Serialize user to session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Google OAuth authentication route
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Callback route after Google authentication
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error',
      successRedirect: 'http://localhost:3000/ss',
    }),
    (req, res) => {
        try {
            console.log("User email:", req.user.email); // Add debug statement
            const refreshTokenJwt = jwt.sign({ email: req.user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
            res.cookie('jwt', refreshTokenJwt, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                secure: false, // Set secure to false for HTTP, true for HTTPS
                sameSite: 'Lax' // Adjust as necessary
            });
            console.log("Refresh token set in cookie:", refreshTokenJwt); // Add debug statement
            res.redirect('/success');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

// Route: Logout
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.clearCookie('jwt'); // Clear the refresh token cookie on logout
        res.redirect('/');
    });
});

// Handle callback and return token
router.get('/auth/google/callback-token',
    passport.authenticate('google', { failureRedirect: '/error' }),
    (req, res) => {
        try {
            const refreshTokenJwt = jwt.sign({ email: req.user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
            res.cookie('jwt', refreshTokenJwt, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                secure: true,
                sameSite: 'None'
            });

            // Extract token from cookies
            const token = getTokenFromCookies(req);

            // Send token to user
            res.json({ token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

// Success route (if needed)
router.get('/success', (req, res) => {
    try {
        const token = getTokenFromCookies(req);
        res.json({ 
            token: token,
            user: req.user 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Error route
router.get('/error', (req, res) => {
    res.send("Error logging in");
});

// Function to get token from cookies
const getTokenFromCookies = (req) => {
    const token = req.cookies.jwt;
    if (!token) {
        throw new Error('Token not found in cookies');
    }
    return token;
};


// Route to get the token
router.get('/get-token', (req, res) => {
    try {
        console.log("Cookies:", req.cookies);
        const token = getTokenFromCookies(req);
        console.log("Token from cookies:", token);
        res.json({ token });
    } catch (error) {
        console.error("Error getting token:", error.message);
        res.status(400).json({ error: error.message });
    }
});


// New route to initiate login and return token
router.get('/initiate-login', (req, res, next) => {
    // Initiate Google login
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

module.exports = router;


// const express = require('express');
// const passport = require('passport');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const router = express.Router();
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const User = require('./models/UserRegister'); // Adjust this to your User model

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// const CALLBACK_URL = "http://localhost:3297/auth/google/callback"; // Adjust as needed

// // Configure session middleware
// router.use(cookieParser());
// router.use(session({
//     secret: 'your_secret_here', // Replace with your own secret key
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Set secure to true if using HTTPS
// }));

// // Initialize passport
// router.use(passport.initialize());
// router.use(passport.session());

// // Configure Google OAuth strategy
// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: CALLBACK_URL
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         // console.log(accessToken + "accessToken");
//         // console.log(refreshToken + "refreshToken");

//         let user = await User.findOne({ googleId: profile.id });
//         if (!user) {
//             user = new User({
//                 googleId: profile.id,
//                 email: profile.emails[0].value,
//                 firstName: profile.name.givenName,
//                 lastName: profile.name.familyName,
//                 image: profile.photos[0].value,
//                 password: generateRandomPassword()
//             });
//             await user.save();

//         }
//         return done(null, user); // Pass the user object to serializeUser
//     } catch (err) {
//         return done(err); // Handle errors
//     }
// }));

// // Serialize user to session
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// // Deserialize user from session
// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// });

// // Google OAuth authentication route
// router.get('/auth/google', passport.authenticate('google', {
//     scope: ['profile', 'email']
// }));

// // Callback route after Google authentication
// router.get('/auth/google/callback',
//     passport.authenticate('google', {
//         successRedirect: 'http://localhost:3001/', // Redirect to homepage on success
//         failureRedirect: '/error' // Redirect to error page on failure
//     })
// );
// router.get('/auth/google/callback',
//     passport.authenticate('google', {
//         failureRedirect: '/error',
//         successRedirect: 'http://localhost:3001/ss',
//     }),
//     (req, res) => {
//         // Store refresh token in a cookie
//         const refreshTokenJwt = jwt.sign({ email: req.user.email }, SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRY });
//         res.cookie('jwt', refreshTokenJwt, {
//             httpOnly: true,
//             maxAge: 7 * 24 * 60 * 60 * 1000,
//             secure: true,
//         });
//         res.redirect('/success');
//     });

// // Route: Logout
// router.get('/logout', (req, res, next) => {
//     req.logout((err) => {
//         if (err) { return next(err); }
//         res.clearCookie('jwt'); // Clear the refresh token cookie on logout
//         res.redirect('/');
//     });
// });

// // New route to initiate login and return token
// router.get('/initiate-login', (req, res, next) => {
//     // Initiate Google login
//     passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
// });
// // New route to handle the callback and return token
// router.get('/auth/google/callback-token',
//     passport.authenticate('google', { failureRedirect: '/error' }),
//     (req, res) => {
//         try {
//             // Store refresh token in a cookie
//             const refreshTokenJwt = jwt.sign({ email: req.user.email }, SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRY });
//             res.cookie('jwt', refreshTokenJwt, {
//                 httpOnly: true,
//                 maxAge: 7 * 24 * 60 * 60 * 1000,
//                 secure: true,
//             });

//             // Extract token from cookies
//             const token = getTokenFromCookies(req);

//             // Send token to user
//             res.json({ token });
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//         }
//     });

// // Success route (if needed)
// router.get('/success', (req, res) => {
//     // Set token in cookie
//     res.cookie('googleAuthToken', req.user.accessToken); // Adjust as per your user object structure
//     res.send("Login successful. Token stored in cookie.");
// });

// // Error route
// router.get('/error', (req, res) => {
//     res.send("Error logging in");
// });
// // פונקציה לקבלת ה-token מהקוקיות
// const getTokenFromCookies = (req) => {
//     const token = req.cookies.jwt;
  
//     if (!token) {
//       throw new Error('Token not found in cookies');
//     }
  
//     return token;
// };

// // מסלול להדגמה
// router.get('/get-token', (req, res) => {
//   try {
//     const token = getTokenFromCookies(req);
//     console.log(token);
//     res.json({ token });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });
// module.exports = router;
