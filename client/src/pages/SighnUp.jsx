import React from 'react'
import useInput from '../hooks/useInput'
import InputField from '../components/inputField'

const SignUp = () => {
    const name = useInput()
    const email = useInput()
    const password = useInput()
    const confirm = useInput()

    const submitHandler = event => {
        event.preventDefault()
    }

    return (
        <div className="row">
            <form className="col s6 offset-s3" onSubmit={submitHandler}>
                <h1>Sign Up</h1>
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
                <button className="btn primary-btn blue lighten-2">Sign up</button>
            </form>
        </div>
    )
}

export default SignUp