const mongoose = require('mongoose')
let connection

function connect() {
  if(connection) return;
    
  const mongoURI = process.env.MONGO_URI 
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,   
  }

  mongoose.connect(mongoURI, options)

  connection = mongoose.connection

  connection.once('open', () => console.log('Successfully connected'))
  connection.on('error', err => console.log('Connection error',err))

  return connection
}

function disconnect() {
  if(!connection) return;
  
  mongoose.disconnect();
}
  
function cleanup() {
  for(const collection in connection.collections) {
    connection.collections[collection].deleteMany({})
  }
}

module.exports = { connect, cleanup, disconnect }