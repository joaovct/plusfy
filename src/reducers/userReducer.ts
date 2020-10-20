import {USER, IUser_action, USER_SUCCESS} from '../store/user/types'
import {Reducer} from 'redux'

const userReducer: Reducer<{}, IUser_action> = (state = {}, action) => {
    switch(action.type){
        case USER:
            return action.status === USER_SUCCESS ? {...action.payload} : {...state}    

        default:
    }       return {...state}
}

export default userReducer