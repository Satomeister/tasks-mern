export const capitalize = value => {
    return value[0].toUpperCase() + value.slice(1)
}

export const decapitalize = value => {
    return value[0].toLowerCase() + value.slice(1)
}

export const isExpired = exp => {
    const nowDate = new Date().toLocaleDateString().split('.')
    exp = exp.split('.')
    for(let i = 2; i >= 0; i--) {
        if (exp[0] - nowDate[0] < 0) {
            return true
        }
    }
    return false
}

export const focus = (ref) => {
    ref.current.focus()
}