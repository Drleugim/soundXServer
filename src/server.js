const express = require('express')
const { connect } = require('./db')

const app = express()
const port = 8000
connect()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello Sound X')
})

app.listen(port, () => console.log(`Server listening on port ${port}`))
