const { Router } = require('express')
const router = Router()
const User = require('../models/user')
const List = require('../models/list')
const Task = require('../models/task')

router.get('/custom/:userId/:listId', async (req, res) => {
    try {
        const listId = req.params.listId
        const userId = req.params.userId
        const list = await List.findById(listId).populate('tasks.task')

        if (!list || list.user.toString() !== userId.toString()) {
            return res.status(404).json({ message: 'list is not found' })
        }
        const result = {
            _id: list._id,
            taskCount: list.taskCount,
            tasks: list.tasks.map(task => task.task),
            title: list.title
        }
        res.json(result)
    } catch (e) {
        console.log(e)
    }
})

router.get('/general/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        const data = await User.findById(userId).populate({ path: 'general.list', populate: { path: 'tasks.task' } }).select('general')
        const result = {
            title: data.general.list.title,
            taskCount: data.general.list.taskCount,
            _id: data.general.list._id,
            tasks: data.general.list.tasks.map(task => task.task)
        }
        res.json(result)
    } catch (e) {
        console.log(e)
    }
})

router.get('/important/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        const data = await User.findById(userId).populate({ path: 'important.list', populate: { path: 'tasks.task' } }).select('important')
        const result = {
            title: data.important.list.title,
            taskCount: data.important.list.taskCount,
            _id: data.important.list._id,
            tasks: data.important.list.tasks.map(task => task.task)
        }
        res.json(result)
    } catch (e) {
        console.log(e)
    }
})

router.post('/:listId/add', async (req, res) => {
    try {
        const taskValue = req.body.task
        const listId = req.params.listId
        const task = new Task({
            task: taskValue,
            list: listId
        })
        task.save()
        const list = await List.findById(listId)
        list.addTask(task._id)
        res.json(task)
    } catch (e) {
        console.log(e)
    }
})

module.exports = router