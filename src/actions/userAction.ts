import api from '../services/api'
import {USER, Iuser_action, USER_SUCCESS, USER_REQUESTED, USER_ERROR} from '../store/user/types'

interface IUserDataResponse{
    data: {}
}

const userAction = (access_token: string) => {
    const options = {headers: { 'Authorization': 'Bearer ' + access_token }}
    
    return function(dispatch: Function) {

        let actionReturn: Iuser_action = {type: USER, status: USER_REQUESTED}
        dispatch( actionReturn )

        api.spotify.get<IUserDataResponse>('/me', options).then( response => {
            actionReturn = {type: USER, status: USER_SUCCESS, payload: response.data}
            dispatch(actionReturn)
        }).catch( err => {
            if(err){
                actionReturn = {type: USER, status: USER_ERROR}
                dispatch(actionReturn)
            }
        })
    }
}

export default userAction