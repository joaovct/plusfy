import React, { FunctionComponent, useCallback } from 'react'
import { IPrivateRoute } from '../../utils/types'
import { useSelector } from 'react-redux'
import { IStore } from '../../store/types'
import { IUser } from '../../store/user/types'
import NotPremium from '../home/NotPremium'
import useDispatchUser from '../../hooks/useDispatchUser'
import useDispatchToken from '../../hooks/useDispatchToken'
import Header from './Header'
import styled from 'styled-components'
import useCurrentState from '../../hooks/useCurrentState'
import usePlaybackSDK from '../../hooks/useDispatchSpotifyPlayer'
import useConnectSocket from '../../hooks/useConnectSocket'
import SocketIoContext from '../../contexts/socket-io-context'
import NowPlaying from './nowPlaying/NowPlaying'


const PrivateRoute: FunctionComponent<IPrivateRoute> = ({Component, accessToken, refreshToken}) => {
    const socket = useConnectSocket()
    useDispatchToken(accessToken, refreshToken)
    usePlaybackSDK()
    useCurrentState()
    useDispatchUser()

    const user = useSelector<IStore, IUser>(store => store.user)

    const userIsPremium = useCallback(() => Object.keys(user).length && user.product !== "premium" ? false : true
    ,[user])

    return (
        <SocketIoContext.Provider value={socket}>
            <WrapperComponent>
                <Header/>
                <Component/>
                {userIsPremium() ? <></> : <NotPremium/>}
                <NowPlaying/>
            </WrapperComponent>
        </SocketIoContext.Provider>
    )
}

export default PrivateRoute

const WrapperComponent = styled.div`
    min-height: 100%;
    display: flex;
    flex-flow: column nowrap;
`