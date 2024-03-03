const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('*****error connection to DB****\n', err)
    throw err // Throw the error for further handling
  }
}

module.exports = connectDB
