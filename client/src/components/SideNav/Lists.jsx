import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { FaClipboardList, FaStar } from 'react-icons/fa'
import SideListsContext from '../../context/listsCountContext/listsCountContext'
import CustomLists from './CustomLists'

const Lists = ({ isShown }) => {
    const { listsState } = useContext(SideListsContext)
    const generalCount = listsState.general.taskCount
    const importantCount = listsState.important.taskCount

    return (
        <>
            <ul className="sidenav-list list__wrapper">
                <li className="sidenav-list__item">
                    <NavLink to='/lists/general' activeClassName='active'>
                        <FaClipboardList/>
                        {
                            isShown &&
                            <>
                                <span className='list__item-title'>General</span>
                                <span className='list__item-count'>{generalCount || ''}</span>
                            </>
                        }
                    </NavLink>
                </li>
                <li className="sidenav-list__item">
                    <NavLink to='/lists/important' activeClassName='active'>
                        <FaStar/>
                        {
                            isShown &&
                            <>
                                <span className='list__item-title'>Important</span>
                                <span className='list__item-count'>{importantCount || ''}</span>
                            </>
                        }
                    </NavLink>
                </li>
            </ul>

            <CustomLists
                lists={listsState.lists}
                isShown={isShown}
            />
        </>
    )
}

export default Lists