import React from 'react'
import Task from './Task'

const TaskList = ({ list }) => {

    const tasks = list.tasks && list.tasks.length > 0 && list.tasks.concat().reverse()

    return (
        <ul className='list'>
            {
                tasks && tasks.map(task => {
                    return (
                        <Task
                            key={task._id}
                            task={task}
                        />
                    )
                })
            }
        </ul>
    )
}

export default TaskList