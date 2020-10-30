import React, { useState } from 'react'
import useValidation from '../hooks/useValidation'

const InputField = ({ input, name, type, validators, placeholder }) => {
    const [focused, setFocused] = useState(false)
    const error = useValidation(input.value, validators, focused)

    return (
        <div className="input-field col s12">
            <input
                onBlur={() => setFocused(true)}
                {...input.bind}
                name={name}
                id={name}
                type={type}
                className={Object.keys(error).length ? 'validate invalid' : 'validate'}
                placeholder={placeholder}
            />
            <label className="active" htmlFor={name}>Name</label>
            {
                Object.keys(error).map(key => {
                    return (
                        <span key={key} className="helper-text" data-error={error[key]}/>
                    )
                })
            }
        </div>
    )
}

export default InputField