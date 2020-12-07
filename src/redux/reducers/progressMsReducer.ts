import {Reducer} from 'redux'
import { ProgressMsAction, PROGRESS_MS } from '../store/progressMs/types'

const progressMs: Reducer<number | null, ProgressMsAction> = (state = null, action) => {
    switch(action.type){
        case PROGRESS_MS:
            return action.payload
        default:
            return state
    }
}

export default progressMs