const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

module.exports = {
  async signup(req, res) {
    try {
      const { body } = req
      const user = await User.create(body)
      
      const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24 }
      )

      res.status(201).json({ token })
    } catch(error) {
      res.status(400).json({ message: 'user could not be created', error })
    }
  },
  async signin(req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if(!user) {
        throw Error('Email or password is invalid ')
      }

      const isValid = await bcrypt.compare(password, user.password)

      if(!isValid) {
        throw Error('Email or password is invalid')
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24 }
      )

      res.status(201).json({ token })
    } catch(error) {
      res.status(401).json({ message: 'user could not be found', error })
    }
  },
}
