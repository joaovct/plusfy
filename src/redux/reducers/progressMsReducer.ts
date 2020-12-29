import {Reducer} from 'redux'
import { ProgressMsAction, PROGRESS_MS } from '../store/progressMs/types'

const progressMs: Reducer<ProgressMsAction['payload']['progressMs'], ProgressMsAction> = (state, action) => {
    switch(action.type){
        case PROGRESS_MS:
            return action.payload.progressMs || 0
        default:
            return state || 0
    }
}

export default progressMs