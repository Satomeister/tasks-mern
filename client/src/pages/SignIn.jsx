import React from 'react'
import useInput from '../hooks/useInput'
import InputField from '../components/inputField'

const SignIn = () => {
    const email = useInput()
    const password = useInput()

    const submitHandler = event => {
        event.preventDefault()
    }

    return (
        <div className="row">
            <form className="col s6 offset-s3" onSubmit={submitHandler}>
                <h1>Sign In</h1>
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
                />
                <button className="btn primary-btn blue lighten-2">Sign in</button>
            </form>
        </div>
    )
}

export default SignIn