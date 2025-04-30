const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()
app.use(express.json())

port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})