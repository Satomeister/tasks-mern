const { Schema, model } = require('mongoose')

const list = new Schema({
    tasks: [
        {
            date: {
                type: Schema.Types.Date,
                default: Date.now(),
                required: true
            },
            task: {
                type: String,
                required: true
            },
            done: {
                type: Boolean,
                default: false
            }
        },
    ]
})

module.exports = model('List', list)