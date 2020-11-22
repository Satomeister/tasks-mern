import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import AuthContext from '../../context/AuthContext'
import SideListsContext from '../../context/listsCountContext/listsCountContext'
import { focus } from '../../utils/utils'
import { toggleVar } from '../../utils/cssVars'
import useInput from '../../hooks/useInput'
import useHttp from '../../hooks/useHttp'
import Lists from './Lists'

const SideNav = () => {
    const { userId } = useContext(AuthContext)
    const { setList, setCustomLists, addNewList } = useContext(SideListsContext)
    const [isShown, setIsShown] = useState(true)
    const inputRef = useRef(null)
    const sidenav = useRef(null)
    const topicInput = useInput()
    const { request } = useHttp()

    useEffect(() => {
        async function getLists() {
            try {
                const lists = await request(`/lists/${userId}`)
                setCustomLists(lists)
                const general = await request(`/list/general/${userId}`)
                const important = await request(`/list/important/${userId}`)
                setList(general)
                setList(important)
            } catch (e) { }
        }
        getLists()
    }, [request, userId])

    const addList = async (e) => {
        e.preventDefault()
        const body =  {
            list: topicInput.value,
            userId
        }
        try {
            const list = await request('/lists/add', 'POST', body)
            addNewList(list)
            topicInput.clear()
        } catch (e) { }
    }

    const sidenavToggle = () => {
        const variable = '--sidebar-width'
        const value = {
            init: '4%',
            toggle: '20%'
        }
        toggleVar(variable, value, isShown, setIsShown)
    }

    return (
        <div ref={sidenav} className="sidenav">
            <button onClick={sidenavToggle} className='burgerMenu'>
                <GiHamburgerMenu size='1.5em' />
            </button>
            <Lists
                isShown={isShown}
            />
            {
                isShown &&
                <div className='addValue__wrapper'>
                    <FaPlus className='addValue__icon' onClick={() => {focus(inputRef)}}/>
                    <form onSubmit={addList}>
                        <input
                            {...topicInput.bind}
                            ref={inputRef}
                            type="text"
                            placeholder='add new list'
                            required
                        />
                    </form>
                </div>
            }
        </div>
    )
}

export default SideNav