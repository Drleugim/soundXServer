const Product = require('../models/product.model')
const User = require('../models/user.model')

module.exports = {
  async publish(req, res) {
    try {
      const { body, user } = req
      const product = await Product.create({ ...body, user, picture: body.picture.secure_url})
      const userUser = await User.findById(user)

      userUser.products.push(product._id)
      await userUser.save({ validateBeforeSave: false })
      res.status(201).json(product)
    } catch(error) {
      res.status(401).json({ message: 'product could not be created', error })
    }
  },
  async buyRent(req, res) {
    try {
      const products = await Product.find().populate('user', 'name')
      res.status(200).json(products)
    } catch(error) {
      res.status(401).json({ message: 'products could not be found', error })
    }
  },
}
