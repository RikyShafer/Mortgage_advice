// const mongoose = require('mongoose')

// const QuestionnaireSchema = new mongoose.Schema({
// firstName: {
//         type: String,
//         // require: true,
//     },
//     lastName: {
//         type: String,
//         // unique: true,
//         lowercase: true, 
//     },
//     ID :{
//         type: String,
//         // required: true,
//     },
//     roCertificateIssueDteles: {
//         type: mongoose.Schema.Types.Date,
//         // require: true,
//         trim: true,
//     },
//     phone: {
//         type: String,
//         // require: true,
//         trim: true,
//     },
//     email: {
//         type: mongoose.Schema.Types.String,
//         // require: true,
//         default: false,
//         trim: true,
//         lowercase: true, 

//     },
//     dateBirth:{
//         type: mongoose.Schema.Types.Date,
//         // require: true,
//         trim: true,
//     },
//     maritalStatus:{
//         type: String,
//         // require: true,
//     },

//     relationshipBetweenTheBorrowers: {
//         type: String,
//         // require: true,
//     },
//     education:{
//         type: String,
//         // require: true,
//     },
//     gender:{
//         type: mongoose.Schema.Types.String,
//         // require: true,
//     },
//     address:{
//         type: mongoose.Schema.Types.String,
//         // require: true,
//     },
//     postalCode:{
//         type: mongoose.Schema.Types.Number,
//         // require: true,
//     },
//     hometown:{
//         type: mongoose.Schema.Types.String,
//         // require: true,
//     },
//     age:{
//         type: mongoose.Schema.Types.Number,
//         // require: true,
//     },
//     theirNativeNumber:{
//         type: mongoose.Schema.Types.Number,
//         // require: true,
//     },
//      discoveryOfTheHilags:{
//         type: mongoose.Schema.Types.Number,
//         // require: true,
//     },
//     passport:{
//         type: mongoose.Schema.Types.String,
//         // require: true,
//     },
//     foreignCitizenship:{
//         type: mongoose.Schema.Types.String,
//         // require: true,
//     },
//     proximityPublicFigure:{
//         type: mongoose.Schema.Types.Boolean,
//         // require: true,
//     },
// },
//     {
//         timestamps: true
//     })
// module.exports = mongoose.model('Questionnaire', QuestionnaireSchema)


const mongoose =require('mongoose');

const QuestionnaireSchema = new mongoose.Schema({
    UserRegister:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"UserRegister"
    },
    ID: {
        type: String,
        // תעודת זהות
        // required: true,
    },
    roCertificateIssueDteles: {
        type: mongoose.Schema.Types.Date,
        // תאריך הנפקת תעודת זהות
        trim: true,
    },
    dateBirth: {
        type: mongoose.Schema.Types.Date,
        // תאריך לידה
        trim: true,
    },
    maritalStatus: {
        type: String,
        // מצב משפחתי
    },
    education: {
        type: String,
        // השכלה
    },
    address: {
        type: mongoose.Schema.Types.String,
        // כתובת מגורים
    },
    postalCode: {
        type: mongoose.Schema.Types.Number,
        // מיקוד
    },
    hometown: {
        type: mongoose.Schema.Types.String,
        // עיר מגורים
    },
    age: {
        type: mongoose.Schema.Types.Number,
        // גיל
    },
    theirNativeNumber: {
        type: mongoose.Schema.Types.Number,
        // מספר ילדים מתחת לגיל 18
    },
    passport: {
        type: mongoose.Schema.Types.String,
        // דרכון
    },
    foreignCitizenship: {
        type: mongoose.Schema.Types.String,
        // אזרחות זרה
    },
    proximityPublicFigure: {
        type: mongoose.Schema.Types.Boolean,
        // קרבה לאיש ציבור
    },
    employment: {
        type: mongoose.Schema.Types.String,
        // תעסוקה
    },
    job: {
        type: mongoose.Schema.Types.String,
        // מקום עבודה
    },
    jobTitle: {
        type: mongoose.Schema.Types.String,
        // תפקיד בעבודה
    },
    seniority: {
        type: mongoose.Schema.Types.String,
        // חדר קדמון
    },
    previousWorkplace: {
        type: mongoose.Schema.Types.String,
        // מקום עבודה קודם
    },
    cpaApprovalForCurrentSub: {
        type:String,
        // אישור מורה כספים נוכחי
    },
    validityOfApprovalOfCPAFromPreviousYear: {
        type: mongoose.Schema.Types.Date,
        // תוקפו של אישור המורה כספים מהשנה הקודמת
    },
    antecedentModifierMole: {
        type:String,        // אישור רו"ח משנה קודמת 
    },
    adiposityPreviousVariables1: {
        type:String,        // שמה משנה קודמת 
    },
    adiposityPreviousVariables2:{
        type:String,        // שמה שנתים  קודמת 
    },
    firstNetSlip: {
        type:String,        // סף רשת ראשון
    },
    secondNetSlip: {
        type:String,        // סף רשת שני
    },
    thirdNetSlip: {
        type:String,        // סף רשת שלישי
    },
    averageIncome: {
        type: mongoose.Schema.Types.Number,
        // הכנסה ממוצעת
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Questionnaire', QuestionnaireSchema);
