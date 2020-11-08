const { Router } = require('express')
const router = Router()
const Task = require('../models/task')

router.put('/:taskId/done', async (req, res) => {
    try {
        const taskId = req.params.taskId
        const isDone = req.body.isDone
        await Task.findByIdAndUpdate(taskId, { done: isDone })
        res.json('success')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router