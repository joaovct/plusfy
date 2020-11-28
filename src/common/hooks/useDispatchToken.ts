// import Axios from 'axios'
// import {useCallback, useEffect, useState} from 'react'
import {useCallback, useEffect} from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import actions from '../../redux/actions/actions'
// import { IToken } from '../../redux/store/token/types'
// import { IStore } from '../../redux/store/types'
// import qs from 'query-string'

const useDispatchToken = (accessToken: string, refreshToken: string) => {
    const dispatch = useDispatch()
    // const [timer, setTimer] = useState(0)
    // const {accessToken: storedToken} = useSelector<IStore, IToken>(store => store.token)

    const dispatchToken = useCallback( (accessToken: string, refreshToken: string) => {
        if(accessToken && refreshToken) dispatch( actions.tokenAction(accessToken, refreshToken) )
    },[dispatch])

    useEffect(() => {
        dispatchToken(accessToken, refreshToken)
    },[accessToken, refreshToken, dispatch, dispatchToken])

    // useEffect(() => {
    //     if(storedToken){
    //         if(timer) clearInterval(timer)
    //         const interval = setInterval( () => {const body = qs.stringify({refresh_token: refreshToken})
    //             Axios.get<{access_token: string}>(`${process.env.REACT_APP_SERVER_URL}/refresh_token?${body}`)
    //                 .then( res => dispatchToken(res.data.access_token, refreshToken) )
                
    //         }, 3500000)
    //         setTimer(interval)
    //     }
    // //eslint-disable-next-line
    // },[storedToken, dispatchToken, refreshToken])
}

export default useDispatchToken