const { Schema, model } = require('mongoose')

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    general: {
        title: {
            type: String,
            default: 'general',
            required: true
        },
        tasks: [
            {
                task: {
                    type: String,
                    required: true
                },
                data: {
                    type: Schema.Types.Date,
                    default: Date.now(),
                    required: true
                },
                done: {
                    type: Boolean,
                    default: false
                },
            }
        ]
    },
    important: {
        title: {
            type: String,
            default: 'important',
            required: true
        },
        tasks: [
            {
                task: {
                    type: String,
                    required: true
                },
                data: {
                    type: Schema.Types.Date,
                    default: Date.now(),
                    required: true
                },
                done: {
                    type: Boolean,
                    default: false
                },
            }
        ]
    },
    lists: [
        {
            list: {
                type: Schema.Types.ObjectId,
                ref: 'List',
                required: true
            }
        }
    ]
})

user.methods.addList = function(id) {
    this.lists = [...this.lists, { list: id }]
    this.save()
}

user.methods.addToGeneral = function(task) {
    this.general.tasks = [...this.general.tasks, { task }]
    this.save()
}

user.methods.addToImportant = function(task) {
    this.important.tasks = [...this.important.tasks, { task }]
    this.save()
}

module.exports = model('User', user)