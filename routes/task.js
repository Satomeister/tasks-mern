const { Router } = require('express')
const router = Router()
const Task = require('../models/task')
const List = require('../models/list')

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

router.put('/:taskId/editTask', async (req, res) => {
    try {
        const taskId = req.params.taskId
        const task = req.body.task
        await Task.findByIdAndUpdate(taskId, { task })
        res.json('success')
    } catch (e) {
        console.log(e)
    }
})

router.post('/:taskId/step/add', async (req, res) => {
    try {
        const taskId = req.params.taskId
        const step = req.body.step
        const task = await Task.findById(taskId)
        task.addStep(step)
        res.json(task.steps[task.steps.length-1])
    } catch (e) {
        console.log(e)
    }
})

router.delete('/:taskId/step/delete', async (req, res) => {
    try {
        const taskId = req.params.taskId
        const stepId = req.body.id
        const task = await Task.findById(taskId)
        task.deleteStep(stepId)
        res.json('success')
    } catch (e) {
        console.log(e)
    }
})

router.delete('/:taskId/delete', async (req, res) => {
    try {
        const taskId = req.params.taskId
        const listId = req.body.listId
        const list = await List.findById(listId)
        list.deleteTask(taskId)

        await Task.findByIdAndDelete(taskId)
        res.json('success')
    } catch (e) {
        console.log(e)
    }
})

router.put('/:taskId/term/add', async (req, res) => {
    try {
        const taskId = req.params.taskId
        const term = req.body.term
        await Task.findByIdAndUpdate(taskId, { term })
        res.json('success')
    } catch (e) {
        console.log(e)
    }
})

router.delete('/:taskId/term/delete', async (req, res) => {
    try {
        const taskId = req.params.taskId
        await Task.findByIdAndUpdate(taskId, { term: null })
        res.json('success')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router