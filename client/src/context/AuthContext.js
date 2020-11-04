import { createContext } from 'react'

const AuthContext = createContext({
    userId: null,
    login: () => {},
    logout: () => {},
    init: () => {}
})

export default AuthContext