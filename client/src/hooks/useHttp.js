import { useCallback, useState } from 'react'

const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const baseUrl = 'http://localhost:5000/api'

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        setError(null)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const res = await fetch(baseUrl + url, { method, headers, body })
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message ? data.message : data.errors[0].msg)
            }

            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    return { request, error, loading }
}

export default useHttp