import React, { useContext, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import useHttp from '../hooks/useHttp'
import AuthContext from '../context/AuthContext'
import useInput from '../hooks/useInput'
import TaskList from './TaskList'
import Tooltip from './Tooltip'

const Main = () => {
    const { userId } = useContext(AuthContext)
    const { listId } = useParams()
    const [list, setList] = useState({})
    const { request } = useHttp()
    const taskInput = useInput()

    useEffect(() => {
        async function getList() {
            try {
                if (listId === 'general') {
                    const list = await request(`/list/general/${userId}`)
                    setList(list)
                } else if (listId === 'important') {
                    const list = await request(`/list/important/${userId}`)
                    setList(list)
                } else {
                    const list = await request(`/list/${listId}`)
                    setList(list)
                }
            } catch (e) {
                console.log(e)
            }
        }
        getList()
    }, [listId, userId, request])

    const addTask = async (event) => {
        if (event.key === 'Enter') {
            try {
                const task = await request(`/list/${list._id}/add`, 'POST', { task: taskInput.value })
                setList(prev => ({ ...prev, tasks: [...prev.tasks, task] }))
                taskInput.clear()
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <div className='main'>
            <h2 className='main__title'>{list.title}  ----</h2>
            <ul className='list'>
                <li className='list__item-inputWrapper'>
                    <div className='list__item-input'>
                        <Tooltip content='Add task' position='top-right'><FaPlus size='1.5em'/></Tooltip>
                        <input { ...taskInput.bind } onKeyPress={addTask} type="text" placeholder='add new task'/>
                    </div>
                </li>
                <TaskList list={list} setList={setList} />
            </ul>
        </div>
    )
}

export default Main