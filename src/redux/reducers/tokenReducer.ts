const initialState = {
    token: null,
    isLoggedIn: false,
}


const tokenReducer = (state: typeof initialState = initialState, action: {token: string | null, type: string, isLoggedIn: boolean}) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token,
                isLoggedIn: action.isLoggedIn
            }
        case 'REMOVE_TOKEN':
            return {
                ...state,
                token: null,
                isLoggedIn: false
            }
        default:
            return state;
    }   
}

export default tokenReducer;