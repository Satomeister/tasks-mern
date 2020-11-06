const { Schema, model } = require('mongoose')

const list = new Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
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
            },
        },
    ]
})

list.methods.addTask = function(task){
    this.tasks = [...this.tasks, { task }]
    this.save()
}

module.exports = model('List', list)