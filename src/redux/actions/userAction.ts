import api from '../../api/api'
import {USER, IUser_action, USER_SUCCESS, USER_REQUESTED, USER_ERROR} from '../store/user/types'

interface IUserDataResponse{
    data: {}
}

const userAction = (accessToken: string) => {
    const options = {headers: { 'Authorization': 'Bearer ' + accessToken }}
    
    return function(dispatch: Function) {

        let actionReturn: IUser_action = {type: USER, status: USER_REQUESTED}
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