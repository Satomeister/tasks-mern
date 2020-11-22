import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaListUl } from 'react-icons/fa'

const CustomLists = ({ lists, isShown }) => {
    return (
        <ul className="sidenav-list">
            {
                lists.length > 0 && lists.map(list => {
                    return (
                        <li key={list._id} className="sidenav-list__item">
                            <NavLink to={`/lists/${list._id}`} activeClassName='active'>
                                <FaListUl/>
                                {
                                    isShown &&
                                    <>
                                        <span className='list__item-title item-text--width'>{ list.title }</span>
                                        <span className='list__item-count'>{ list.taskCount || '' }</span>
                                    </>
                                }
                            </NavLink>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default CustomLists
