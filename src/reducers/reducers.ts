import {combineReducers} from 'redux'
import user from './userReducer'
import token from './tokenReducer'
import player from './playerReducer'
import spotifyPlayer from './spotifyPlayerReducer'
import { USER_LOGOFF } from '../store/user/types'

const appReducer = combineReducers({user,token,player, spotifyPlayer})
const rootReducer = (state: any, action: {type: string, status: string, payload?: any} ) => {
    switch(action.type){
        case USER_LOGOFF:
            state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer