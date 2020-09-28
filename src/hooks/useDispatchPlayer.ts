import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../actions/actions'
import { Itoken } from '../store/token/types'
import { Istore } from '../store/types'

const useDispatchPlayer = () => {
    const {accessToken} = useSelector<Istore, Itoken>(store => store.token)
    const dispatch = useDispatch()

    useEffect(() => {
        if(accessToken)
            dispatch(actions.playerAction(accessToken))
    },[accessToken, dispatch])
}

export default useDispatchPlayer