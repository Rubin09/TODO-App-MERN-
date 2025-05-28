const mongoose = require('mongoose')
require('colors')

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.DBURL)
    console.log(`Connted To Mongodb ${mongoose.connection.host}`.bgGreen.white)
  } catch (error) {
    console.log(`Mongodb Error ${error}`)
  }
}

module.exports = connectDB