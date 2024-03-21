const mongoose = require('mongoose')
//מודל ליצרת קשר 
const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
        trim: true,
    }, 
    email: {
        type: mongoose.Schema.Types.String,
        require: true,
        trim: true,
        lowercase: true, 
    },
    message: {
        type: String,
        require: true,
        trim: true,
    },
},
    {
        timestamps: true
    })
module.exports = mongoose.model('Contact', ContactSchema)