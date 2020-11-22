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
    taskCount: {
      type: Number,
      default: 0,
      required: true
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
    this.taskCount = ++this.taskCount
    this.save()
}

list.methods.deleteTask = function(id){
    this.tasks = this.tasks.filter(task => task.task._id.toString() !== id.toString())
    this.taskCount = --this.taskCount
    this.save()
}

module.exports = model('List', list)