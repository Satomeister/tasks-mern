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
            task: {
                type: Schema.Types.ObjectId,
                ref: 'Task'
            }
        }
    ]
})

list.methods.addTask = function(task){
    this.tasks = [...this.tasks, { task }]
    this.save()
}

module.exports = model('List', list)