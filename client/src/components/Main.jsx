import React, { useContext, useEffect, useState } from 'react'
import { BiCheckCircle, BiCircle } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import useHttp from '../hooks/useHttp'
import AuthContext from '../context/AuthContext'
import useInput from '../hooks/useInput'

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
                    const data = await request(`/list/general/${userId}`)
                    setList(data)
                } else if (listId === 'important') {
                    const data = await request(`/list/important/${userId}`)
                    setList(data)
                } else {
                    const data = await request(`/list/${listId}`)
                    setList(data)
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
                const tasks = await request(`/list/${listId}/add`, 'POST', { task: taskInput.value, userId })
                setList(prev => ({ ...prev, tasks }))
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
                        <FaPlus size='1.5em'/>
                        <input { ...taskInput.bind } onKeyPress={addTask} type="text" placeholder='add new task'/>
                    </div>
                </li>
                {
                    list.tasks && list.tasks.length > 0 && list.tasks.concat().reverse().map(task => {
                        return(
                            <li key={task._id} className='list__item-wrapper'>
                                <div className='list__item'>
                                    <BiCircle size='1.5em' />
                                    <span>{task.task}</span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Main