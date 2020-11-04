import React, { useEffect, useState } from 'react'
import { BiCheckCircle, BiCircle } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import useHttp from '../hooks/useHttp'

const Main = () => {
    const { listId } = useParams()
    const { request } = useHttp()
    const [list, setList] = useState({})

    useEffect(() => {
        async function getList() {
            try {
                const data = await request(`/lists/${listId}`)
                setList(data)
            } catch (e) {
                console.log(e)
            }
        }
        getList()
    }, [listId, request])

    return (
        <div className='main'>
            <h2 className='main__title'>{list.title}  ----</h2>
            <ul className='list'>
                <li className='list__item-inputWrapper'>
                    <div className='list__item-input'>
                        <FaPlus size='1.5em'/>
                        <input type="text" placeholder='add new task'/>
                    </div>
                </li>
                {
                    list.tasks && list.tasks.length > 0 && list.tasks.map(task => {
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