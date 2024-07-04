
// require("dotenv").config() // משמש להגדרת קונפיגורציה עבור משתני סביבה מתוך קובץ .env
// const express = require("express") // יבוא של ספריית ה-Express, ספריית פריימוורק ליצירת אפליקציות ווב ב-Node.js
// const session = require("express-session");
// const passport = require("passport");
// const cors = require("cors") // יבוא של ספריית ה-CORS, המאפשרת שימוש בפוליסות CORS באפליקציה
// const cookieParser=require("cookie-parser")
// const corsOptions = require("./config/corsOptions") // יבוא של קובץ ההגדרות של פוליסות ה-CORS
// const connectDB = require("./config/dbConn") // יבוא של פונקציה להתחברות למסד נתונים
// const mongoose=require("mongoose") // יבוא של ספריית Mongoose, המאפשרת פעולות עם מסד נתונים MongoDB

// const cors_proxy = require('cors-anywhere'); // יבוא של ספריית ה-CORS-Anywhere, המאפשרת יצירת שרת Proxy עם פוליסת CORS
// const googleRouter = require('./route/googleRouter');

// const PORT = process.env.PORT || 3297 // הגדרת משתנה PORT לפי ערך מסוים או לפי ערך 7001 כברירת מחדל

// cors_proxy // יצירת שרת Proxy באמצעות ה-CORS-Anywhere
//   .createServer({
//     originWhitelist: [], // רשימת המקורות המורשים לגישה דרך ה-Proxy
//   })

// const app = express() // יצירת אפליקציה חדשה באמצעות ה-Express
// connectDB() // התחברות למסד נתונים

// //middlewares - יישום מידלוורים
// app.use(cors(corsOptions)) // שימוש בפוליסות ה-CORS שהוגדרו
// app.use(cookieParser())
// app.use(express.json()) // השימוש ב-JSON כפורמט להעברת נתונים בבקשות
// app.use(express.static("public")) // שימוש בתיקיית הקבצים הסטטית בשם "public" לקבצי סטטיקה


// app.use(session({
//   secret: 'SECRET',
//   resave: false,
//   saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(googleRouter); // Use the googleRouter for routes

// //routes 
// app.use("/api/UserRegister", require("./route/routeUserRegister"));
// app.use("/api/auth", require("./route/authRouter"))

//  app.use("/api/Usere", require("./route/routeUsets"));
//  app.use("/api/Questionnaire", require("./route/routeQuestionnaire"));
//  app.use("/api/contact", require("./route/routeContact"))
//  app.use("/api/Conversation", require("./route/routeConversation"))
//  app.use("/api", require("./route/fileRoutes")); // Use the file routes
// //  app.use("/api/login", require("./route/jsonwebtoken"));


// // ניתן לכתוב מסלולים כאן לפי דרישות האפליקציה

// app.get("/",(req,res)=>{ // הגדרת מסלול בשם הפסוקה הראשונה ב-URL
// res.send(`בדיקה האם השרת לאתר של אבא עובד
//   בעזרת ה' יצא לי אתר מדהים
//     בשם ה' נעשה ונצליח `) // מענה לבקשת GET עם מחרוזת טקסט
// })

// mongoose.connection.once('open', () => { // התחברות מוצלחת למסד הנתונים
//     console.log('Connected to MongoDB') // הדפסת הודעה על התחברות מוצלחת למסד הנתונים
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// })

// mongoose.connection.on('error', err => { // שגיאה בהתחברות למסד הנתונים
//     console.log(err) // הדפסת השגיאה
// })


require("dotenv").config(); // Load environment variables from .env file
const express = require("express"); // Import Express framework
const session = require("express-session"); // Import express-session for session management
const passport = require("passport"); // Import passport for authentication
const cors = require("cors"); // Import CORS middleware
const cookieParser = require("cookie-parser"); // Import cookie parser
const corsOptions = require("./config/corsOptions"); // Import CORS options
const connectDB = require("./config/dbConn"); // Import database connection function
const mongoose = require("mongoose"); // Import Mongoose for MongoDB

const cors_proxy = require('cors-anywhere'); // Import CORS-anywhere for proxy
const googleRouter = require('./googleRouter'); // Import googleRouter for Google OAuth

const PORT = process.env.PORT || 3297; // Set the port from environment variable or default to 3297

// Create a CORS proxy server
cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
});

// Initialize Express application
const app = express();
connectDB(); // Connect to the database

// Use middleware
app.use(cors(corsOptions)); // Enable CORS with specified options
app.use(cookieParser()); // Use cookie parser middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.static("public")); // Serve static files from "public" directory

// // Use session and passport for authentication
// app.use(session({
//   secret: 'SECRET', // Secret key for session
//   resave: false,
//   saveUninitialized: true,
// }));




// הגדרת מנוע התצוגה
app.set('view engine', 'ejs');
app.set('views', './views'); // תיקיית התבניות
app.get('/', function (req, res) {
  // העברת המשתמש המחובר לתבנית
  const user = req.user || null;
  res.render('pages/auth', { user });
});

// כאשר קונפיגורציה של פספורט
app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(googleRouter); // Use Google OAuth routes

// Define other routes
app.use("/api/UserRegister", require("./route/routeUserRegister"));
app.use("/api/auth", require("./route/authRouter"));
app.use("/api/Usere", require("./route/routeUsets"));
app.use("/api/Questionnaire", require("./route/routeQuestionnaire"));
app.use("/api/contact", require("./route/routeContact"));
app.use("/api/Conversation", require("./route/routeConversation"));
app.use("/api", require("./route/fileRoutes"));

// Root route
app.get("/good", (req, res) => {
  res.send(`בדיקה האם השרת לאתר של אבא עובד
  בעזרת ה' יצא לי אתר מדהים
  בשם ה' נעשה ונצליח`);
});


// Start the server and connect to MongoDB
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// Log errors if any during MongoDB connection
mongoose.connection.on('error', err => {
  console.log(err);
});
