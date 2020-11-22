import React, { useState } from 'react'
import useValidation from '../hooks/useValidation'
import { capitalize } from '../utils/utils'

const InputField = ({ input, name, type, validators }) => {
    const [focused, setFocused] = useState(false)
    const error = useValidation(input.value, validators, focused)

    const isErrors = !!Object.keys(error).length
    console.log(error)
    return (
        <div className={isErrors ? 'form__input invalid' : 'form__input'} >
            <input
                onBlur={() => setFocused(true)}
                {...input.bind}
                name={name}
                id={name}
                type={type}
                required
            />
            <label className="active" htmlFor={name}>{capitalize(name)}</label>
            {
                Object.keys(error).map(key => {
                    return (
                        <span key={key} className="helper-text" >{ error[key] }</span>
                    )
                })
            }
        </div>
    )
}

export default InputField