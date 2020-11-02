import {IToken_action, TOKEN, IToken} from '../store/token/types'
import { Reducer } from 'redux'

const intialState: IToken = {
    accessToken: '',
    refreshToken: ''
}

const tokenReducer: Reducer<{}, IToken_action> = (state = intialState, action) => {
    switch(action.type){
        case TOKEN:
            return {...action.payload}
        default:
            return {...state}
    }
}

export default tokenReducer