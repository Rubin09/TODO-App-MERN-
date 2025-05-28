const userModel = require('../model/userModel')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
require('dotenv').config()

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Please fill in all fields', success: false })
    }

    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: 'user already exist',
      })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // save user
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    })
    await newUser.save()

    return res.status(201).send({
      success: true,
      message: 'User Register Successfully',
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err.message, success: false, err })
  }
}

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false })
    }

    const pass = await bcrypt.compare(password, user.password)
    if (!pass) {
      return res
        .status(404)
        .json({ message: 'Invalid password', success: false })
    }

    const token = await JWT.sign({ id: user._id }, process.env.JWTSECRET, {
      expiresIn: '1d',
    })
    return res.status(200).send({
      success: true,
      message: 'login successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err.message, success: false, err })
  }
}

module.exports = { loginController, registerController }
