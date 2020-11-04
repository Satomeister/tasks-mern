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

module.exports = model('User', user)