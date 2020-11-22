import React, { useContext } from 'react'
import useInput from '../hooks/useInput'
import InputField from '../components/inputField'
import useHttp from '../hooks/useHttp'
import AuthContext from '../context/AuthContext'
import { Redirect } from 'react-router-dom'

const SignIn = () => {
    const { login, userId } = useContext(AuthContext)
    const email = useInput()
    const password = useInput()
    const { request, error, loading } = useHttp()

    const submitHandler = async event => {
        event.preventDefault()
        try {
            const data = await request('/auth/signin', 'POST', { email: email.value, password: password.value })
            login(data.token)
        } catch (e) { }
    }

    if (userId) return <Redirect to='/lists/general'/>

    return (
        <div className='form-wrapper'>
            <form className='form' onSubmit={submitHandler}>
                <h1 className='form__title'>Sign In</h1>
                {
                    !!error && <div className='form__alert'>{error}</div>
                }
                <InputField
                    name='email'
                    type='text'
                    input={email}
                    validators={{
                        email: true
                    }}
                />
                <InputField
                    name='password'
                    type='password'
                    input={password}
                />
                <button disabled={loading} className='form__submit-button'>Sign in</button>
            </form>
        </div>
    )
}

export default SignIn