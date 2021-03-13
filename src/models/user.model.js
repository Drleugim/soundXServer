const {model, models, Schema} = require('mongoose')

const regExForEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        match:[regExForEmail, 'Invalid email, please enter a valid email address'] ,
        validate: {
            async validator(email){
                try{
                    const user = models.User.findOne({email})
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
        required: true,
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
        enum: {
            values: ['cedula de ciudadania', 'cedula de extranjeria', 'Pasaporte'],
            message: 'Invalid document type'
        }
    },
    documentNumber:{type: String},
})

const User = model('User', userSchema)

module.exports = User