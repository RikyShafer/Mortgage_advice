// const mongoose = require('mongoose')

// const UserRegisterSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true,
//     },
//     lastName: {
//         type: String,
//         required: true,

//     },
//     password: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     roles: {
//         type: [String],
//         enum: ["ADMIN", "USER"],
//         default: ["USER"],
//     },
//     email: {
//         type: mongoose.Schema.Types.String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         unique: true,
//     },

//     phone: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     anotherQuestion:{
//         type: String,
//         required: false,
//     }, 
//     deleted:{
//         type: Boolean,
//         required: false,
//         default:false,
//     }
// ​

// },
//     {
//         timestamps: true
//     })
// module.exports = mongoose.model('UserRegister', UserRegisterSchema)

const mongoose = require('mongoose');

const UserRegisterSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        enum: ["ADMIN", "USER"],
        default: "USER",
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    anotherQuestion: {
        type: String,
        required: false,
    },
    active:{
        type:Boolean,
        required:true,
        default:false
    },
    view:{//האם המנהל צפה בלקוח כבר 
        type:Boolean,
        required:true,
        default:false
    },
    image:{
        type:String,
    },
    deleted: {
        type: Boolean,
        required: false,
        default: false,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('UserRegister', UserRegisterSchema);
