import React, { useContext } from 'react'
import useInput from '../hooks/useInput'
import InputField from '../components/inputField'
import useHttp from '../hooks/useHttp'
import AuthContext from '../context/AuthContext'
import { Redirect } from 'react-router-dom'

const SignUp = () => {
    const { login, userId } = useContext(AuthContext)
    const name = useInput()
    const email = useInput()
    const password = useInput()
    const confirm = useInput()
    const { request, error, loading } = useHttp()

    const submitHandler = async event => {
        event.preventDefault()
        const body = {
            name: name.value,
            email: email.value,
            password: password.value,
            confirm: confirm.value
        }
        try {
            const data = await request('/auth/signup', 'POST', body)
            login(data.token)
        } catch (e) { }
    }

    if (userId) return <Redirect to='/lists/general'/>

    return (
        <div className='form-wrapper'>
            <form className='form' onSubmit={submitHandler}>
                <h1 className='form__title'>Sign Up</h1>
                {
                    !!error && <div className='form__alert'>{error}</div>
                }
                <InputField
                    name='name'
                    type='text'
                    input={name}
                    validators={{
                        minLength: 3,
                        maxLength: 30
                    }}
                />
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
                    validators={{
                        minLength: 6
                    }}
                />
                <InputField
                    name='confirm'
                    type='password'
                    input={confirm}
                    validators={{
                        match: password
                    }}
                />
                <button disabled={loading} className='form__submit-button'>Sign up</button>
            </form>
        </div>
    )
}

export default SignUp