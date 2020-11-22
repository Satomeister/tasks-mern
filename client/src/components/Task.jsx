import React, { useContext, useMemo, useRef, useState } from 'react'
import { BiCheckCircle, BiCircle } from 'react-icons/bi'
import { MdDateRange } from 'react-icons/md'
import { updateVar } from '../utils/cssVars'
import { isExpired } from '../utils/utils'
import useHttp from '../hooks/useHttp'
import Tooltip from './Tooltip'
import ListContext from '../context/listContext/listContext'

const Task = ({ task }) => {
    const { doneToggle: done, setTask } = useContext(ListContext)
    const[exp, setExp] = useState(false)
    const icon = useRef(null)
    const { request } = useHttp()

    useMemo(() => {
        if (task.term && isExpired(task.term.date)) {
            setExp(true)
        }
    }, [task.term])

    const doneToggle = async (isDone) => {
        try {
            await request(`/task/${task._id}/done`, 'PUT', { isDone })
            done(task._id)
        } catch (e) { }
    }

    const showTaskInfo = (event) => {
        const targetElement = event.target.closest('.' + icon.current.className)
        if (targetElement !== icon.current) {
            updateVar('--taskInfo-width', '23%')
            setTask(task)
        }
    }

    return (
        <>
            <li onClick={showTaskInfo} className='list__item-wrapper'>
                <div className='list__item'>
                    <Tooltip ref={icon} content='finish task' position='bottom-right'>
                        {
                            !task.done ? <BiCircle onClick={() => {doneToggle(true)}} size='1.5em' />
                                       : <BiCheckCircle onClick={() => {doneToggle(false)}} size='1.5em' />
                        }
                    </Tooltip>
                    <span className='list__item-text'>{task.task}</span>
                    {
                        task.term ? exp ?
                            <span className='list__item-term exp'>
                                <MdDateRange size='1em'/>
                                Expired: { task.term.date }
                            </span>
                            :
                            <span className='list__item-term'>
                                <MdDateRange size='1em'/>
                                Term: { task.term.title }
                            </span>
                            : null
                    }
                </div>
            </li>
        </>
    )
}

export default Task