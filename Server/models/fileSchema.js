// models/File.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
    filename: { 
        type: String,
         required: true 
        },

});

module.exports = mongoose.model('File', fileSchema);
