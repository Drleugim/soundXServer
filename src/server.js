require('dotenv').config()
const express = require('express')
const cors = require ('cors')
const morgan = require('morgan')
const { connect } = require('./db')
const userRouter = require('./routes/user')
const productRouter = require('./routes/product')
const { auth } = require('./utils/auth')


const app = express()
const port = process.env.PORT || 8000 
connect()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/users', userRouter)
app.use('/products', productRouter)

app.get('/',(req,res)=>{
    res.send('Hello Sound X')
})

app.get('/products', auth, (req, res) => {
  const { user } = req
  res.send(`authenticated ${user}`)
})

app.listen(port, () => console.log(`Server listening on port ${port}`))