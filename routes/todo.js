const { Router } = require('express')
const router = Router()
const User = require('../models/user')
const List = require('../models/list')

router.get('/:listId', async (req, res) => {
    try {
        const listId = req.params.listId
        const list = await List.findById(listId)
        res.json(list)
    } catch (e) {
        console.log(e)
    }
})

router.post('/general/add', async (req, res) => {
    try {
        const task = req.body.task
        const userId = req.body.userId
        const user = await User.findById(userId)
        user.addToGeneral(task)
        res.json(user.general.tasks)
    } catch (e) {
        console.log(e)
    }
})

router.post('/important/add', async (req, res) => {
    try {
        const task = req.body.task
        const userId = req.body.userId
        const user = await User.findById(userId)
        user.addToImportant(task)
        res.json(user.important.tasks)
    } catch (e) {
        console.log(e)
    }
})

router.post('/:listId/add', async (req, res) => {
    try {
        const task = req.body.task
        const listId = req.params.listId
        const list = await List.findById(listId)
        list.addTask(task)
        res.json(list.tasks)
    } catch (e) {
        console.log(e)
    }
})

router.get('/general/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        const general = await User.findById(userId).select('general')
        res.json(general.general)
    } catch (e) {
        console.log(e)
    }
})

router.get('/important/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        const important = await User.findById(userId).select('important')
        res.json(important.important)
    } catch (e) {
        console.log(e)
    }
})

module.exports = router