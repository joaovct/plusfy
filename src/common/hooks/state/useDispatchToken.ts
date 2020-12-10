import {useCallback, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import actions from '../../../redux/actions/actions'
import { getNewAccessToken } from '../../api/server/endpoints'
import { setAccessToken } from '../../helpers/helperUserAccess'

const useDispatchToken = (accessToken: string, refreshToken: string, expiresIn: number) => {
    const dispatch = useDispatch() 

    const updateToken = useCallback(async () => {
        const data = (await getNewAccessToken(refreshToken))
        if(data){
            dispatch(actions.tokenAction(data.access_token, refreshToken))
            setAccessToken(data.access_token)
        }
    },[refreshToken, dispatch])

    useEffect(() => {
        dispatch(actions.tokenAction(accessToken, refreshToken))
        setInterval(() => {
            updateToken()
        }, expiresIn * 1000 - 100000)
    },[accessToken, refreshToken, expiresIn, dispatch, updateToken])

}

export default useDispatchToken