export const toStyledDate = ($el, date) => {
    const options = {
        month: 'long',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric'
    }
    $el = new Intl.DateTimeFormat('en-US', options).format(date)
    return $el
}

export const getTermDate = (term = 0) => {
    const date = new Date().toLocaleDateString().split('.')
    const day = +date[0] + term
    const month = date[1]
    const year = date[2]
    return `${day}.${month}.${year}`
}