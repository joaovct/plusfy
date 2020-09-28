import { Reducer } from 'redux'
import { Iplayer_action, PLAYER, PLAYER_SUCCESS } from '../store/player/types'

const playerReducer: Reducer<{}, Iplayer_action> = (state = {}, action) => {
    switch(action.type){
        case PLAYER:
            return action.status === PLAYER_SUCCESS ? {...action.payload} : {...state} 
        default:
            return {...state}
    }
}

export default playerReducer