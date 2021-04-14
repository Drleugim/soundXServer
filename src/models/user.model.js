const {model, models, Schema} = require('mongoose')
const bcrypt = require('bcrypt')

const regExForEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

const userSchema = new Schema({
    email:{
        type: String,
        required: [true, 'Email is required'],
        match:[regExForEmail, 'Invalid email, please enter a valid email address'] ,
        validate: {
            async validator(email){
                try{
                    const user = await models.User.findOne({email})
                    return !user
                }
                catch(e){
                    return false
                }
            },
            message: 'The email entered is already in use',
        },
    },
    password:{
        type: String,
        required: [true,'Password is required'],
        minLength: [6,'Password must contain at least 6 characters']
    },
    name:{type: String},
    lastName:{type: String},
    age:{
        type: Number,
        min:[18, 'You must be over 18 years old']
    },
    documentType:{
        type: String,
        enum:{
            values: ['cedula de ciudadania', 'cedula de extranjeria', 'Pasaporte'],
            message: 'Invalid document type'
        }
    },
    documentNumber:{type: String},
    products:{
      type:[{type: Schema.Types.ObjectId, ref: 'Products'}],
    }
}, {
  timestamps: true,
})

userSchema.pre('save', async function() {
  if(this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
})

const User = model('User', userSchema)

module.exports = User