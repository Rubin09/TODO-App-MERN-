const jtoken = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({
        success: false,
        message: 'Authorization token missing or invalid',
      })
    }

    const token = authHeader.split(' ')[1] // safely extract the token

    jtoken.verify(token, process.env.JWTSECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Unauthorized user - invalid token',
        })
      } else {
        req.user = decode
        next()
      }
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message, success: false })
  }
}
