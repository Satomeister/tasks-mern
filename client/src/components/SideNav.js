import React, { useContext, useEffect, useRef, useState } from 'react'
import useInput from '../hooks/useInput'
import { FaPlus } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import Lists from './Lists'
import useHttp from '../hooks/useHttp'
import AuthContext from '../context/AuthContext'

const SideNav = () => {
    const { userId } = useContext(AuthContext)
    const [isShown, setIsShown] = useState(true)
    const [lists, setLists] = useState([])
    const input = useRef(null)
    const sidenav = useRef(null)
    const topicInput = useInput()
    const { request } = useHttp()

    const focus = () => {
        input.current.focus()
    }

    useEffect(() => {
        async function getLists() {
            try {
                const data = await request(`/lists/${userId}`)
                setLists(data.lists)
            } catch (e) {
                console.log(e)
            }
        }
        getLists()
    }, [request, userId])

    const addList = async (event) => {
        if (event.key === 'Enter') {
            const body =  {
                list: topicInput.value,
                userId
            }
            try {
                const data = await request('/lists/add', 'POST', body)
                setLists(prev => [ ...prev, data ])
                topicInput.clear()
            } catch (e) {
                console.log(e)
            }
        }
    }

    const sidenavToggle = () => {
        const variable = '--sidebar-width'
        const css = document.documentElement.style
        if (isShown || css.getPropertyValue(variable) === '') {
            css.setProperty(variable, '4%')
            setIsShown(false)
        } else {
            css.setProperty(variable, '20%')
            setIsShown(true)
        }
    }

    return (
        <div ref={sidenav} className="sidenav">
            <button onClick={sidenavToggle} className='burgerMenu'>
                <GiHamburgerMenu size='1.5em' />
            </button>
            <Lists isShown={isShown} lists={lists}/>
            {
                isShown &&
                <div className='addTopic__wrapper'>
                    <FaPlus className='addTopic__icon' onClick={focus}/>
                    <input {...topicInput.bind} onKeyPress={addList} ref={input} type="text" placeholder='add new list'/>
                </div>
            }
        </div>
    )
}

export default SideNav