const initialState = {
    user: null
}

const metaDataReducer = (state: typeof initialState = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'SET_META_DATA':
            return {
                ...state,
                user: action.payload
            }
        case 'REMOVE_META_DATA':
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}

export default metaDataReducer; 