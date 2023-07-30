import {signUp,logIn} from '../api/index'
import setCurrentUser from './currentUser'

export const signup = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await signUp(authData)
        console.log(data);
        localStorage.setItem('Profile',JSON.stringify({...data}))
        dispatch({ type: 'AUTH', data })
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/')
    } catch (error) {
        console.log(error,'auth.js actions signup');
    }
} 
export const login = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await logIn(authData)
        dispatch({ type: 'AUTH', data })
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/')
    } catch (error) {
        console.log(error,'auth.js actions login');
    }
}  