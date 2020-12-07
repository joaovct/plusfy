import {combineReducers} from 'redux'
import user from './userReducer'
import token from './tokenReducer'
import currentState from './currentStateReducer'
import progressMs from './progressMsReducer'
import spotifyPlayer from './spotifyPlayerReducer'
import disabledTracks from './disabledTracksReducer'
import { USER_LOGOFF } from '../store/user/types'

const appReducer = combineReducers({user,token,currentState,progressMs,spotifyPlayer,disabledTracks})
const rootReducer = (state: any, action: {type: string, status: string, payload?: any} ) => {
    switch(action.type){
        case USER_LOGOFF:
            state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer