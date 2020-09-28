import React, { FunctionComponent, useCallback, useEffect } from 'react'
import { IPrivateRoute } from '../../utils/types'
import { useSelector } from 'react-redux'
import { Istore } from '../../store/types'
import { Iuser } from '../../store/user/types'
import NotPremium from '../home/NotPremium'
import useDispatchUser from '../../hooks/useDispatchUser'
import useDispatchToken from '../../hooks/useDispatchToken'
import Header from './Header'
import styled from 'styled-components'
import usePlaybackSDK from '../../hooks/usePlaybackSDK'
import useConnectSocket from '../../hooks/useConnectSocket'
import SocketIoContext from '../../contexts/socket-io-context'
import useDispatchPlayer from '../../hooks/useDispatchPlayer'
import { Iplayer } from '../../api/webapi/types'


const PrivateRoute: FunctionComponent<IPrivateRoute> = ({Component, accessToken, refreshToken}) => {
    const socket = useConnectSocket()
    usePlaybackSDK()
    useDispatchToken(accessToken, refreshToken)
    useDispatchUser()
    useDispatchPlayer()

    const user = useSelector<Istore, Iuser>(store => store.user)
    const player = useSelector<Istore, Iplayer>(store => store.player)

    useEffect(() => {
        console.log(player)
    },[player])

    const userIsPremium = useCallback(() => Object.keys(user).length && user.product !== "premium" ? false : true
    ,[user])

    return (
        <SocketIoContext.Provider value={socket}>
            <WrapperComponent>
                <Header/>
                <Component/>
                {userIsPremium() ? <></> : <NotPremium/>}
            </WrapperComponent>
        </SocketIoContext.Provider>
    )
}

export default PrivateRoute

const WrapperComponent = styled.div`
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
`