import {Itoken_action, TOKEN, Itoken} from '../store/token/types'
import { Reducer } from 'redux'

const intialState: Itoken = {
    accessToken: '',
    refreshToken: ''
}

const tokenReducer: Reducer<{}, Itoken_action> = (state = intialState, action) => {
    switch(action.type){
        case TOKEN:
            return {...action.payload}
        default:
            return {...state}
    }
}

export default tokenReducer