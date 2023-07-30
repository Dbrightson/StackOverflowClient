import * as api from '../api/index'

export const fetchAllUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAllUsers()
        dispatch({ type: 'FETCH_USERS', payload: data })
    } catch (error) {
        console.log('src actions users fetchAllUsers',error)
    }
}

export const updateProfile = (id, updateData) => async (dispatch) => {
    try {
        const { data } = await api.updateProfile(id, updateData)
        dispatch({type:'UPDATE_CURRENT_USER',payload:data})
    } catch (error) {
        console.log('src actions users updateProfile',error)
    }
}