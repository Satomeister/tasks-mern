const { Router } = require('express')
const router = Router()
const User = require('../models/user')
const List = require('../models/list')

router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        const data = await User.findById(userId).populate('lists.list', '_id title').select('lists')
        const lists = data.lists.map(list => list.list)
        res.json(lists)
    } catch (e) {
        console.log(e)
    }
})

router.post('/add', async (req, res) => {
    try {
        const { userId, list: listTitle } = req.body
        const list = await new List({
            title: listTitle,
            user: userId,
            tasks: []
        })
        list.save()
        const user = await User.findById(userId)
        user.addList(list._id)
        const result = {
            _id: list._id,
            title: list.title
        }
        res.json(result)
    } catch (e) {
        console.log(e)
    }
})

module.exports = router