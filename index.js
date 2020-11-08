const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors');
const authRoute = require('./routes/auth')
const listsRoute = require('./routes/lists')
const todoRoute = require('./routes/todo')
const taskRoute = require('./routes/task')

const app = express()

app.use(cors());
app.options('*', cors());

const port = config.get('port')

app.use(express.json({ extended: true }))
app.use('/api/auth', authRoute)
app.use('/api/lists', listsRoute)
app.use('/api/list', todoRoute)
app.use('/api/task', taskRoute)

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