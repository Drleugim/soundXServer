const express = require('express')
const { connect } = require('./db')
const userRouter = require('./routes/user')

const app = express()
const port = 8000
connect()

app.use(express.json())

app.use('/users', userRouter)

app.get('/',(req,res)=>{
    res.send('Hello Sound X')
})

app.listen(port, () => console.log(`Server listening on port ${port}`))