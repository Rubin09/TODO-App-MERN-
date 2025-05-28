const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/connection')
const todoRouter = require('./routes/todoRoutes')
const userRouter = require('./routes/userRoutes')

// require('dotenv').config() env config
dotenv.config()


connectDB()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api/v1/todo', todoRouter)
app.use('/api/v1/user', userRouter)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server running in port ${port}`.bgMagenta)
})
