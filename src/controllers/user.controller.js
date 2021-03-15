const User = require('../models/user.model')

module.exports = {
  async signup(req, res) {
    try {
      const { body } = req
      const user = await User.create(body)

      res.status(201).json(user)
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

      if(password !== user.password) {
        throw Error('Email or password is invalid')
      }

      res.status(201).json(user)
    } catch(error) {
      res.status(401).json({ message: 'user could not be found', error })
    }
  },
}
