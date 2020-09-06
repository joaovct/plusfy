import {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import actions from '../actions/actions'

const useDispatchUser = (accessToken: string) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.userAction(accessToken))
    },[accessToken, dispatch])
}

export default useDispatchUser