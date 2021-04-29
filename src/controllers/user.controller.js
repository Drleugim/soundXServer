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
      res.status(400).json({ error })
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
      res.status(400).json({ message: error.message })
    }
  },
  async userData(req, res) {
    try {
      const { user } = req
      const selectedUser = await User.findById(user)
      res.status(200).json({name:selectedUser.name, email:selectedUser.email, id:selectedUser._id })
    } catch(error) {
      res.status(400).json({ error })
    }
  },
  async editUser(req, res) {
    try {
      const { body, params: { userId } } = req
      const selectedUser = await User.findByIdAndUpdate(userId, body)
      res.status(200).json(selectedUser)
    } catch(error) {
      res.status(400).json({ error })
    }
  }
}
