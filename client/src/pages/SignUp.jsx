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

    if (userId) return <Redirect to='/'/>

    return (
        <div className="row">
            <form className="col s6 offset-s3" onSubmit={submitHandler}>
                <h1>Sign Up</h1>
                {
                    !!error && <div className='form-alert'>{error}</div>
                }
                <InputField
                    name='name'
                    type='text'
                    input={name}
                    placeholder='Your name'
                    validators={{
                        minLength: 3,
                        maxLength: 30
                    }}
                />
                <InputField
                    name='email'
                    type='text'
                    input={email}
                    placeholder='Your email'
                    validators={{
                        email: true
                    }}
                />
                <InputField
                    name='password'
                    type='password'
                    input={password}
                    placeholder='Your password'
                    validators={{
                        minLength: 6
                    }}
                />
                <InputField
                    name='confirm'
                    type='password'
                    input={confirm}
                    placeholder='Confirm password'
                    validators={{
                        match: password
                    }}
                />
                <button disabled={loading} className="btn primary-btn blue lighten-2">Sign up</button>
            </form>
        </div>
    )
}

export default SignUp