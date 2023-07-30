import {combineReducers} from 'redux'
import authReducer from './auth'
import currentUserReducer from './currentUser'
import questionReducer from './questions'
import usersReducer from './users'

export default combineReducers({
    authReducer,currentUserReducer,questionReducer,usersReducer
})
