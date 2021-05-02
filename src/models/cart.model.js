const {model, Schema} = require('mongoose')

const cartSchema = new Schema({
   user:{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [{
              product: {
                  type: Schema.Types.ObjectId,
                  ref: 'Product',
                  required: true
              },
              quantity: {
                type: String,
                required: true,
              },
    }]
}, {
  timestamps: true,
})

const Cart = model('Cart', cartSchema)

module.exports = Cart