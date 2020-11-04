import React, { useContext } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Navbar = () => {
    const history = useHistory()
    const { logout, userId } = useContext(AuthContext)

    const logoutHandler = (event) => {
        event.preventDefault()
        logout()
        history.push('/signin')
    }

    if (!userId) {
        return (
            <nav className='header'>
                <Link to="/" className="logo">UTasks</Link>
                <ul className='navbar'>
                    <li><NavLink to='/signup'>Sign Up</NavLink></li>
                    <li><NavLink to="/signin">Sign In</NavLink></li>
                </ul>
            </nav>
        )
    }

    return (
        <nav className='header'>
            <Link to="/" className="logo">UTasks</Link>
            <ul className='navbar'>
                <li><a href='/' onClick={logoutHandler}>Sign out</a></li>
            </ul>
        </nav>
    )
}

export default Navbar