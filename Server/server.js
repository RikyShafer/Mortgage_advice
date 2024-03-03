require("dotenv").config() // משמש להגדרת קונפיגורציה עבור משתני סביבה מתוך קובץ .env
const express = require("express") // יבוא של ספריית ה-Express, ספריית פריימוורק ליצירת אפליקציות ווב ב-Node.js
const cors = require("cors") // יבוא של ספריית ה-CORS, המאפשרת שימוש בפוליסות CORS באפליקציה
const cookieParser=require("cookie-parser")
const corsOptions = require("./config/corsOptions") // יבוא של קובץ ההגדרות של פוליסות ה-CORS
const connectDB = require("./config/dbConn") // יבוא של פונקציה להתחברות למסד נתונים
const mongoose=require("mongoose") // יבוא של ספריית Mongoose, המאפשרת פעולות עם מסד נתונים MongoDB

const cors_proxy = require('cors-anywhere'); // יבוא של ספריית ה-CORS-Anywhere, המאפשרת יצירת שרת Proxy עם פוליסת CORS

const PORT = process.env.PORT || 3297 // הגדרת משתנה PORT לפי ערך מסוים או לפי ערך 7001 כברירת מחדל

cors_proxy // יצירת שרת Proxy באמצעות ה-CORS-Anywhere
  .createServer({
    originWhitelist: [], // רשימת המקורות המורשים לגישה דרך ה-Proxy
  })

const app = express() // יצירת אפליקציה חדשה באמצעות ה-Express
connectDB() // התחברות למסד נתונים

//middlewares - יישום מידלוורים
app.use(cors(corsOptions)) // שימוש בפוליסות ה-CORS שהוגדרו
app.use(cookieParser())
app.use(express.json()) // השימוש ב-JSON כפורמט להעברת נתונים בבקשות
app.use(express.static("public")) // שימוש בתיקיית הקבצים הסטטית בשם "public" לקבצי סטטיקה

//routes 
app.use("/api/UserRegister", require("./route/routeUserRegister"));
app.use("/api/auth", require("./route/authRouter"))

 app.use("/api/Usere", require("./route/routeUsets"));
 app.use("/api/Questionnaire", require("./route/routeQuestionnaire"));

//  app.use("/api/login", require("./route/jsonwebtoken"));


// ניתן לכתוב מסלולים כאן לפי דרישות האפליקציה

app.get("/",(req,res)=>{ // הגדרת מסלול בשם הפסוקה הראשונה ב-URL
res.send(`בדיקה האם השרת לאתר של אבא עובד
  בעזרת ה' יצא לי אתר מדהים
    בשם ה' נעשה ונצליח `) // מענה לבקשת GET עם מחרוזת טקסט
})

mongoose.connection.once('open', () => { // התחברות מוצלחת למסד הנתונים
    console.log('Connected to MongoDB') // הדפסת הודעה על התחברות מוצלחת למסד הנתונים
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

})

mongoose.connection.on('error', err => { // שגיאה בהתחברות למסד הנתונים
    console.log(err) // הדפסת השגיאה
})