import React from 'react'
import Task from './Task'

const TaskList = ({ list, setList }) => {

    const updateList = (id) => {
        setList(prev => ({
            ...prev,
            tasks: prev.tasks.map(t => {
                if (t._id === id) {
                    return { ...t, done: !t.done }
                } else return t
            })
        }))
    }

    return (
        <>
            {
                list.tasks && list.tasks.length > 0 && list.tasks.concat().reverse().map(task => {
                    return (
                        <Task key={task._id} task={task} updateList={updateList}/>
                    )
                })
            }
        </>
    )
}

export default TaskList