import React from 'react'
import { BiCheckCircle, BiCircle } from 'react-icons/bi'
import useHttp from '../hooks/useHttp'
import Tooltip from './Tooltip'

const Task = ({ task, updateList }) => {
    const { request } = useHttp()

    const doneToggle = async (isDone) => {
        try {
            await request(`/task/${task._id}/done`, 'PUT', { isDone })
            updateList(task._id)
        } catch (e) { }
    }

    return (
        <li className='list__item-wrapper'>
            <div className='list__item'>
                {
                    !task.done ? <Tooltip content='finish task' position='top-right'><BiCircle onClick={() => {doneToggle(true)}} size='1.5em' /></Tooltip>
                        : <Tooltip content='task' position='top-right'><BiCheckCircle  onClick={() => {doneToggle(false)}} size='1.5em' /></Tooltip>
                }
                <span className='list__item-text'>{task.task}</span>
            </div>
        </li>
    )
}

export default Task