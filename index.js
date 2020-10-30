const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const app = express()

const authRoute = require('./routes/auth')

const port = config.get('port')

app.use(express.json({ extended: true }))
app.use('/api/auth', authRoute)

async function start() {
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        app.listen(port, () => {
           console.log(`App has been started on port ${port}`)
        })
    } catch (e) {
        console.log(e.message)
    }
}

start()