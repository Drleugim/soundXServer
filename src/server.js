require('dotenv').config()
const express = require('express')
const { connect } = require('./db')
const userRouter = require('./routes/user')
const productRouter = require('./routes/product')
const cors = require ('cors')

const app = express()
const port = process.env.PORT || 8000 
connect()

app.use(express.json())
app.use(cors())

app.use('/users', userRouter)
app.use('/products', productRouter)

app.get('/',(req,res)=>{
    res.send('Hello Sound X')
})

app.listen(port, () => console.log(`Server listening on port ${port}`))