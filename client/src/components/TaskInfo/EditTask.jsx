import React, { useEffect, useRef, useState } from 'react'
import { BiCheckCircle, BiCheckSquare, BiCircle, BiPencil } from 'react-icons/bi'
import Tooltip from '../Tooltip'
import { focus } from '../../utils/utils'
import useHttp from '../../hooks/useHttp'

const EditTask = ({ task, doneToggle, editTaskValue }) => {
    const [edit, setEdit] = useState(false)
    const [input, setInput] = useState(task.task)
    const editRef = useRef(null)
    const doneIcon = useRef(null)
    const { request } = useHttp()

    useEffect(() => {
        if (edit) {
            focus(editRef)
        }
    }, [edit])

    useEffect(() => {
        setInput(task.task)
    }, [task])

    const done = async (isDone) => {
        try {
            await request(`/task/${task._id}/done`, 'PUT', { isDone })
            doneToggle(task._id)
        } catch (e) { }
    }

    const editTask = async () => {
        try {
            if (input.trim()) {
                await request(`/task/${task._id}/editTask`, 'PUT', { task: input } )
                editTaskValue({ id:task._id, value: input })
                setEdit(false)
            }
        } catch (e) { }
    }

    return (
        <div className='taskInfo__item-wrapper'>
            <div className='list__item taskInfo__item'>
                <Tooltip ref={doneIcon} content='finish task' position='right'>
                    {
                        !task.done
                            ? <BiCircle onClick={() => {done(true)}} size='1.5em' />
                            : <BiCheckCircle onClick={() => {done(false)}} size='1.5em' />
                    }
                </Tooltip>
                {
                    edit
                        ? <>
                            <input
                                onBlur={editTask}
                                ref={editRef}
                                onChange={(e) => {setInput(e.target.value)}}
                                value={input}
                                className='list__item-text' type='text'
                                required
                            />
                            <BiCheckSquare onClick={editTask} className='taskInfo__item-edit' size='1.5em' />
                        </>
                        : <>
                            <span
                                onDoubleClick={() => {setEdit(true)}}
                                className='list__item-text item-text--width'
                            >{ task.task }</span>
                            <BiPencil onClick={() => {setEdit(true)}} className='taskInfo__item-edit' size='1.5em' />
                        </>
                }
            </div>
        </div>
    )
}

export default EditTask
