const setToken = (token: string) => {
    return {
        type: 'SET_TOKEN',
        token: token,
        isLoggedIn: true,
    }
}

const removeToken = () => {
    return {
        type: 'REMOVE_TOKEN',
        token: null,
        isLoggedIn: false,
    }
}


export default { removeToken, setToken };