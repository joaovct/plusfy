import { Reducer } from 'redux'
import { DISABLED_TRACKS, IDisabledTracks_action } from '../store/disabledTracks/types'

const disabledTracks: Reducer<{}, IDisabledTracks_action> = (state = {}, action) => {
    switch(action.type){
        case DISABLED_TRACKS:
            return {...action.payload}
        default:
            return {...state}
    }
}

export default disabledTracks