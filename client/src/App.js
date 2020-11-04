import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Routes from './components/Routes'
import AuthContext from './context/AuthContext'
import useAuth from './hooks/useAuth'
import Preloader from './components/Preloader'
import { Redirect } from 'react-router-dom'

const App = () => {
    const { userId, init, login, logout, ready } = useAuth()

    useEffect(() => {
        init()
    }, [])

    if (!ready) return <Preloader />

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
