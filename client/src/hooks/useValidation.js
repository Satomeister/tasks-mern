import { useMemo, useState } from 'react'

const useValidation = (value, validators = {}, focused) => {
    const [error, setError] = useState({})

    useMemo(() => {
        if (focused && Object.keys(validators).length) {
            const obj = {}
            Object.keys(validators).forEach(key => {
                switch (key) {
                    case 'minLength':
                        if (value.trim().length <= validators[key]) {
                            obj[key] = `must be more than ${validators[key]} symbols`
                        } else {
                            delete obj[key]
                        }
                        break
                    case 'maxLength':
                        if (value.trim().length >= validators[key]) {
                            obj[key] = `must be less than ${validators[key]} symbols`
                        } else {
                            delete obj[key]
                        }
                        break
                    case 'email':
                        if (!value.trim().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                            obj[key] = `email is invalid`
                        } else {
                            delete obj[key]
                        }
                        break
                    case 'match':
                        if (value.trim() !== validators[key].value.trim()) {
                            obj[key] = `passwords do not match`
                        } else {
                            delete obj[key]
                        }
                        break
                    default: return null
                }
            })
            setError(obj)
        }
    }, [value, setError, validators, focused])
    return error
}

export default useValidation