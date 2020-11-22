const css = document.documentElement.style

export const updateVar = (variable, value) => {
    css.setProperty(variable, value)
}

export const toggleVar = (variable, value, bool, setIsOpen) => {
    if (bool || css.getPropertyValue(variable) === '') {
        css.setProperty(variable, value.init)
        setIsOpen(false)
    } else {
        css.setProperty(variable, value.toggle)
        setIsOpen(true)
    }
}