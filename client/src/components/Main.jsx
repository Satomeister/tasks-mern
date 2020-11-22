import React, { useContext, useEffect, useRef } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import AuthContext from '../context/AuthContext'
import SideListsContext from '../context/listsCountContext/listsCountContext'
import ListContext from '../context/listContext/listContext'
import { focus } from '../utils/utils'
import { updateVar } from '../utils/cssVars'
import useHttp from '../hooks/useHttp'
import useInput from '../hooks/useInput'
import TaskList from './TaskList'
import TaskInfo from './TaskInfo/TaskInfo'

const Main = () => {
    const { userId } = useContext(AuthContext)
    const { increaseTaskCount } = useContext(SideListsContext)
    const { list, setList, addTask, setTask } = useContext(ListContext)
    const inputRef = useRef(null)
    const { listId } = useParams()
    const { request, error } = useHttp()
    const taskInput = useInput()

    const clearChosenTask = () => {
        setTask({})
        updateVar('--taskInfo-width', '0')
    }

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
                    const list = await request(`/list/custom/${userId}/${listId}`)
                    setList(list)
                }
                clearChosenTask()
            } catch (e) { }
        }
        getList()
    }, [listId, userId, request])

    const addNewTask = async (e) => {
        e.preventDefault()
        try {
            const task = await request(`/list/${list._id}/add`, 'POST', { task: taskInput.value })
            addTask(task)
            increaseTaskCount(list)
            taskInput.clear()
        } catch (e) { }
    }

    if (error === 'list is not found')
        return <Redirect to='/404'/>

    if (list) {
        return (
            <>
                <div className='main'>
                    <div className='main-top'>
                        <h2 className='main__title'>{ list.title }</h2>
                        <div className='list__item-inputWrapper'>
                            <div className='list__item-input'>
                                <FaPlus className='addValue__icon' onClick={() => {focus(inputRef)}} size='1.5em'/>
                                <form onSubmit={addNewTask}>
                                    <input
                                        ref={inputRef}
                                        { ...taskInput.bind }
                                        type="text"
                                        placeholder='add new task'
                                        required
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="main-bottom">
                        <TaskList
                            list={list}
                        />
                    </div>
                </div>
                <TaskInfo
                    listId={list._id}
                    clearChosenTask={clearChosenTask}
                />
            </>
        )
    }
   return null
}

export default Main