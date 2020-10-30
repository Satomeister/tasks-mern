import { useState } from 'react'

const useInput = () => {
    const [input, setInput] = useState('')

    return {
        bind: {
            onChange: (event) => {
                setInput(event.target.value)
            },
            value: input
        },
        value: input,
        clear: () => setInput('')
    }
}

export default useInput
