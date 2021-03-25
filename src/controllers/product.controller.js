const Product = require('../models/product.model')
const User = require('../models/user.model')

module.exports = {
  async publish(req, res) {
    try {
      const { body, params: { userId } } = req
      const product = await Product.create({ ...body, user: userId , picture: body.picture.secure_url})
      const user = await User.findById(userId)

      user.products.push(product._id)
      await user.save({ validateBeforeSave: false })
      res.status(201).json(product)
    } catch(error) {
      res.status(400).json({ message: 'product could not be created', error })
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
