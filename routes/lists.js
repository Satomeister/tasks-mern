const { Router } = require('express')
const router = Router()
const User = require('../models/user')
const List = require('../models/list')

router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        const lists = await User.findById(userId).populate('lists.list', '_id title').select('lists')
        res.json(lists)
    } catch (e) {
        console.log(e)
    }
})

router.post('/add', async (req, res) => {
    try {
        const { userId, list } = req.body
        const newList = await new List({
            title: list,
            userId,
            tasks: []
        })
        newList.save()
        const user = await User.findById(userId)
        user.addList(newList._id)
        res.json({ list: { _id: newList._id, title: newList.title } })
    } catch (e) {
        console.log(e)
    }
})

module.exports = router