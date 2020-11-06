import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaClipboardList, FaListUl, FaStar } from 'react-icons/fa'

const Lists = ({isShown, lists}) => {
    return (
        <>
            <ul className="sidenav-list list__wrapper">
                <li className="sidenav-list__item">
                    <NavLink to='/lists/general' activeClassName='active'>
                        <FaClipboardList/>
                        {isShown && <span>General</span>}
                    </NavLink>
                </li>
                <li className="sidenav-list__item">
                    <NavLink to='/lists/important' activeClassName='active'>
                        <FaStar/>
                        {isShown && <span>Important</span>}
                    </NavLink>
                </li>
            </ul>

            <ul className="sidenav-list">
                {
                    lists.length > 0 && lists.map(i => {
                        return (
                            <li key={i.list._id} className="sidenav-list__item">
                                <NavLink to={`/lists/${i.list._id}`} activeClassName='active'>
                                    <FaListUl/>
                                    {isShown && <span>{i.list.title}</span>}
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default Lists