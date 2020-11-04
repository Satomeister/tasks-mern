import { useState } from 'react'
import jwt_decode from "jwt-decode"

const storageName = 'UserData'

const useAuth = () => {
    const [userId, setUserId] = useState(null)
    const [ready, setReady] = useState(false)

    const login = (token) => {
        const decode = jwt_decode(token)
        setUserId(decode.userId)
        localStorage.setItem(storageName, JSON.stringify({ id: decode.userId }))
    }

    const logout = () => {
        setUserId(null)
        localStorage.removeItem(storageName)
    }

    const init = () => {
        const userData = userId || JSON.parse(localStorage.getItem(storageName))
        if (userData && userData.id) {
            setReady(true)
            setUserId(userData.id)
        } else {
            setReady(true)
        }
    }

    return {
        userId, init, login, logout, ready
    }
}

export default useAuth