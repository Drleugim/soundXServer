const {model, Schema} = require('mongoose')

const productSchema = new Schema({
    nameProduct:{
      type: String,
      required: true,
    },
    buyPrice:{
      type: Number,
      min:[0.01, 'The price must be greater than 0 dollars'],
      required: true,
    },
    rentPrice:{
      type: Number,
      min:[0.01, 'The price must be greater than 0 dollars'],
      required: true,
    },
    description:{
      type: String,
      required: true,
      maxLength: [500,'The description must be shorter than 500 characters']
    },
    picture:{ 
      type: String,
      required: true,
    },
    fullDescription:{type: String},
    user:{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
},{
  timestamps: true,
})

const Product = model('Product', productSchema)

module.exports = Product