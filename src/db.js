const mongoose = require('mongoose');

function connect() {
    const mongoURI = 'mongodb://localhost:27017/soundx_db'
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
    }
    
    mongoose.connect(mongoURI,options)

    const { connection } = mongoose

    connection.once('open',()=> console.log('Successfully connected'))
    connection.on('error', err => console.log('Connection error',err))

    return connection
}

module.exports = { connect }