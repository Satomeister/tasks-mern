import React, { useRef, useState } from 'react'
import {
    RiTerminalBoxFill,
    RiTerminalWindowFill
} from 'react-icons/ri'
import { MdClose } from 'react-icons/md'
import { getTermDate } from '../../utils/date'
import useHttp from '../../hooks/useHttp'

const initialTerms = [
    {
        title: 'Today',
        date: getTermDate()
    },
    {
        title: 'Tomorrow',
        date: getTermDate(1)
    },
    {
        title: 'Weak',
        date: getTermDate(6)
    }
]

const Term = ({ task, addTerm, removeTerm }) => {
    const [termDropDown, setTermDropDown] = useState(false)
    const closeIcon = useRef(null)
    const [terms] = useState(initialTerms)
    const { request } = useHttp()

    const dropDownOpen = (event) => {
        const targetElement = event.target.closest('.' + closeIcon.current.className)
        if (targetElement !== closeIcon.current) {
            setTermDropDown(prev => !prev)
        }
    }

    const setTerm = async (index) => {
        const term = terms[index]
        try {
            await request(`/task/${task._id}/term/add`, 'PUT', { term })
            addTerm(task._id, term)
        } catch (e) { }
    }

    const deleteTerm = async () => {
        try {
            await request(`/task/${task._id}/term/delete`, 'DELETE')
            removeTerm(task._id)
        } catch (e) { }
    }

    return (
        <div className="taskWrapper term unselectable">
            {
                !!task.term && !!task.term.date ?
                    <div onClick={dropDownOpen} className="select withTerm">
                        <RiTerminalWindowFill className='select__icon' size='1.5em'/>
                        <span className='select__title'>Term: { task.term.title }</span>
                        <span ref={closeIcon} className='deleteTerm'>
                            <MdClose onClick={deleteTerm} size='1.5em'/>
                        </span>
                    </div>
                    :
                    <div onClick={() => {setTermDropDown(prev => !prev)}} className="select">
                        <RiTerminalWindowFill className='select__icon' size='1.5em'/>
                        <span className='select__title'>Add term</span>
                    </div>
            }
            {
                termDropDown && <ul className='term-dropdown'>
                    <h3 className='term-dropdown__header'>Term</h3>
                    {
                        terms.map((term, index) => {
                            return (
                                <li onClick={() => {setTerm(index)}} key={term.title} className='term-dropdown__item'>
                                    <RiTerminalBoxFill size='1em'/>
                                    <span>{ term.title }</span>
                                </li>
                            )
                        })
                    }
                </ul>
            }
        </div>
    )
}

export default Term
