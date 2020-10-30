import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper blue lighten-2">
                <Link to="/" className="brand-logo">Tasks</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to='/signup'>Sign Up</NavLink></li>
                    <li><NavLink to="/signin">Sign In</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar