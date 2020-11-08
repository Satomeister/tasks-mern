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
        list: {
            type: Schema.Types.ObjectId,
            ref: 'List'
        }
    },
    important: {
        list: {
            type: Schema.Types.ObjectId,
            ref: 'List'
        }
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

user.methods.setDefaultLists = function(general, important) {
    this.general = { list: general }
    this.important = { list: important }
    this.save()
}

user.methods.addList = function(list) {
    this.lists = [...this.lists, { list }]
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