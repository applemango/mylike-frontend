export const getSystemStyle = (): string => {
    if(!process.browser)
        return "light"
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? "dark"
        : "light"
}

export const getLocalStyle = (): string => {
    if(!process.browser)
        return "light"
    const s = localStorage.getItem("style")
    if(s)
        return s
    return getSystemStyle()
}

export const setLocalStyle = (style: string): void => {
    localStorage.setItem("style", style)
}