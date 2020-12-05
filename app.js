const express = require('express')
let jokes = require('./store')

const app = express()

const jokeRoutes = require('./routes/jokes')
app.use('/jokes', jokeRoutes)

app.listen(3000, async function(){  
    
})
