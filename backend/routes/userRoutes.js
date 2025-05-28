const express = require('express')
const {
  registerController,
  loginController,
} = require('../controller/userContoller')
const router = express.Router()

router.post('/register', registerController).post('/login', loginController)
module.exports = router
