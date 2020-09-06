import {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import actions from '../actions/actions'

const useDispatchToken = (accessToken: string, refreshToken: string) => {
    const dispatch = useDispatch()
    useEffect(() => {
        if(accessToken && refreshToken){
            dispatch( actions.tokenAction(accessToken, refreshToken) )
        }
    },[accessToken, refreshToken, dispatch])
}

export default useDispatchToken