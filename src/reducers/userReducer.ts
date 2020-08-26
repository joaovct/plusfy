import {USER, IUSER, USER_SUCCESS} from '../store/user/types'
import {Reducer} from 'redux'

interface IState{}

export const userReducer:Reducer<IState, IUSER> = (state = {}, action) => {
    switch(action.type){
        case action.type = USER:
            return action.status === USER_SUCCESS ? {...action.payload} : {...state}    

        default:
    }       return {...state}
}

export default userReducer