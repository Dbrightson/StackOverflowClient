const authReducer = (state = {data:null}, action) => {
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('Profile',JSON.stringify({...action?.data}))
            return {...state,data:action?.data}
            // break;
        
        case 'LOGOUT':
            localStorage.clear()
            return {...state, data:null}
        
        default:
            return state
            // break;
    }
}

export default authReducer