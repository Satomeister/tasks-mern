import React from 'react'
import { MdClose } from 'react-icons/md'
import useHttp from '../../hooks/useHttp'

const StepsLists = ({ task, removeStep }) => {
    const { request } = useHttp()

    const deleteStep = async (id) => {
        try {
            await request(`/task/${task._id}/step/delete`, 'DELETE', { id })
            removeStep(id)
        } catch (e) { }
    }

    return (
        <ul className='list'>
            {
                task.steps && task.steps.map(st => {
                    return (
                        <li key={st._id} className='list__item-wrapper step__item'>
                            <div className='list__item'>
                                <MdClose style={{cursor: 'pointer'}} onClick={() => {deleteStep(st._id)}} size='1.5em' />
                                <span className='list__item-text'>{ st.step }</span>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default StepsLists
