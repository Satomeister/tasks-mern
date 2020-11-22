import React, { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import AuthContext from './context/AuthContext'
import Navbar from './components/Navbar'
import Routes from './components/Routes'
import useAuth from './hooks/useAuth'

const App = () => {
    const { userId, init, login, logout, ready } = useAuth()
    const history = useHistory()

    useEffect(() => {
        init()
        if (history.location.pathname === '/') {
            history.push('/lists/general')
        }
    }, [])

    if (!ready) return null

    return (
        <AuthContext.Provider value={{
            userId, init, login, logout
        }}>
            {
                !userId && <Redirect to='/signin'/>
            }
            <Navbar/>
            <Routes />
        </AuthContext.Provider>
    )
}

export default App;
