import {Reducer} from 'redux'
import { ProgressMsAction, PROGRESS_MS } from '../store/progressMs/types'

const progressMs: Reducer<ProgressMsAction['payload'], ProgressMsAction> = (state = {}, action) => {
    switch(action.type){
        case PROGRESS_MS:
            return {...action.payload}
        default:
            return {...state}
    }
}

export default progressMs