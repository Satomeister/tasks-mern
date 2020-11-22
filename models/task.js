const { Schema, model } = require('mongoose')

const task = new Schema({
    list: {
      type: Schema.Types.ObjectId,
      ref: 'List',
      required: false
    },
    steps: [
        {
            step: {
                type: String,
                required: true
            }
        }
    ],
    date: {
        type: Schema.Types.Date,
        default: Date.now,
        required: true
    },
    term: {
        title: {
            type: String,
        },
        date: {
            type: String,
        }
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

task.methods.addStep = function(step) {
    this.steps = [...this.steps, { step }]
    this.save()
}

task.methods.deleteStep = function(id) {
    this.steps = this.steps.filter(step =>  step._id.toString() !== id.toString())
    this.save()
}

module.exports = model('Task', task)