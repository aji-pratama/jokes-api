const express = require('express')

const app = express()

const jokeRoutes = require('./routes/jokes')
app.use('/jokes', jokeRoutes)

app.listen(3000, async function(){  
    console.log('Server Started...')  
})
