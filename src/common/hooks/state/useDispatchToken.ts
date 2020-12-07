import {useCallback, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import actions from '../../../redux/actions/actions'
import { getNewAccessToken } from '../../api/server/endpoints'

const useDispatchToken = (accessToken: string, refreshToken: string, expiresIn: number) => {
    const dispatch = useDispatch() 

    const updateToken = useCallback(async () => {
        const data = (await getNewAccessToken(refreshToken))
        dispatch(actions.tokenAction(data.access_token, refreshToken))
    },[refreshToken, dispatch])

    useEffect(() => {
        dispatch(actions.tokenAction(accessToken, refreshToken))
        setInterval(() => {
            updateToken()
        }, expiresIn * 1000 - 100000)
    },[accessToken, refreshToken, expiresIn, dispatch, updateToken])

}

export default useDispatchToken