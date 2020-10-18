import { Reducer } from "react";
import {IcurrentState_action, CURRENT_STATE} from '../store/currentState/types'

const currentState: Reducer<{}, IcurrentState_action> = (state = {}, action) => {
    switch(action.type){
        case CURRENT_STATE:
            return {...action.payload}
        default:
            return {...state}
    }
}

export default currentState