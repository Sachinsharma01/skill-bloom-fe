const setMetaData = (payload: any) => {
    return {
        type: 'SET_META_DATA',  
        payload: payload
    }
}

const removeMetaData = () => {
    return {
        type: 'REMOVE_META_DATA',
        payload: null
    }
}


export default { setMetaData, removeMetaData };