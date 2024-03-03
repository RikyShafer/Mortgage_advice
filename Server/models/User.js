const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        required: true, // Corrected spelling from 'require' to 'required'
        unique: true,
        lowercase: true, 
    },
    password:{
        type: String,
        required: true,
    },
    roles: {
        type: [String], 
        enum: ["ADMIN", "USER"],
        default: ["USER"], 
    },
    email: {
        type: mongoose.Schema.Types.String,
        require: true,
        default: false,
        trim: true,
        lowercase: true, 
        unique: true,
    },
    city:{
        type: String,
        require: true,
    },

    address: {
        type: String,
        require: true,
    },
    number:{
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
        trim: true,
    },
    date:{
        type: mongoose.Schema.Types.Date,
        require: true,
        trim: true,
    },
    CountryBirth:{
        type: mongoose.Schema.Types.String,
        require: true,
    },

},
    {
        timestamps: true
    })
module.exports = mongoose.model('User', UsersSchema)