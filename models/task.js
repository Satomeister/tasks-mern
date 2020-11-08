const { Schema, model } = require('mongoose')

const task = new Schema({
    list: {
      type: Schema.Types.ObjectId,
      ref: 'List',
      required: false
    },
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
    },
})

module.exports = model('Task', task)