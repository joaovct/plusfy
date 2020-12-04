import {useCallback, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../../redux/actions/actions'
import { IToken } from '../../../redux/store/token/types'
import { IStore } from '../../../redux/store/types'
import { getNewAccessToken } from '../../api/server/endpoints'

const useDispatchToken = (accessToken: string, refreshToken: string, expiresIn: number) => {
    const dispatch = useDispatch() 
    const {accessToken: token} = useSelector<IStore, IToken>(store => store.token)

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

    useEffect(() => console.log(token), [token])
}

export default useDispatchToken