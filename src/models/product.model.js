const {model, Schema} = require('mongoose')

const productSchema = new Schema({
    status:{
      type: String,
      required: true,
      enum: {
        values: ['sell', 'rent', 'sellAndRent'],
        message: 'Invalid product status, please select one'
      }
    },
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
    quantity: {
      type: Number,
      min:[1, 'The quantity avalable must be more or equal to 1'],
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    newUsed:{
      type:String,
      require: true,
      minLength: [3,'Must be either new or used']
    },
    description:{
      type: String,
      required: true,
      maxLength: [500,'The description must be shorter than 500 characters'],
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