import {combineReducers} from 'redux'
import user from './userReducer'
import token from './tokenReducer'
import player from './playerReducer'
import { USER_LOGOFF } from '../store/user/types'

const appReducer = combineReducers({user,token,player})
const rootReducer = (state: any, action: {type: string, status: string, payload?: any} ) => {
    switch(action.type){
        case USER_LOGOFF:
            state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer