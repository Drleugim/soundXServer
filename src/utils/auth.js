const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if(!authorization) {
      throw new Error('Your session has expired')
    }

    const [_, token] = authorization.split(' ')

    if(!token) {
      throw new Error('Your session has expired')
    }

    const { userId } = jwt.verify(token, process.env.SECRET)

    req.user = userId

    next()
  } catch(error) {
    res.status(401).json({ message: error.message })
  }
}
