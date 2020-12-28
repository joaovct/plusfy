import { Reducer } from "react";
import {ICurrentState_action, CURRENT_STATE} from '../store/currentState/types'

const currentState: Reducer<{}, ICurrentState_action> = (state = {}, action) => {
    switch(action.type){
        case CURRENT_STATE:
            return {...state, ...action.payload}
        default:
            return {...state}
    }
}

export default currentState