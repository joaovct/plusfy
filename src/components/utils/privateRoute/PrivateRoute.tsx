import React, { FunctionComponent, useCallback } from 'react'
import { IPrivateRoute } from '../routes/types'
import { useSelector } from 'react-redux'
import { IStore } from '../../../redux/store/types'
import { IUser } from '../../../redux/store/user/types'
import NotPremium from './NotPremium'
import useDispatchUser from '../../../common/hooks/useDispatchUser'
import useDispatchToken from '../../../common/hooks/useDispatchToken'
import Header from './Header'
import styled from 'styled-components'
import useCurrentState from '../../../common/hooks/useCurrentState'
import usePlaybackSDK from '../../../common/hooks/useDispatchSpotifyPlayer'
import NowPlaying from './nowPlaying/NowPlaying'
import AddPlaylistProvider from '../../../common/providers/AddPlaylistProvider'
import AddPlaylist from '../../common/addPlaylist/AddPlaylist'
import AlertProvider from '../../../common/providers/AlertProvider'
import Alerts from '../../common/alert/Alert'

const PrivateRoute: FunctionComponent<IPrivateRoute> = ({Component, accessToken, refreshToken}) => {
    useDispatchToken(accessToken, refreshToken)
    usePlaybackSDK()
    useCurrentState()
    useDispatchUser()

    const user = useSelector<IStore, IUser>(store => store.user)

    const userIsPremium = useCallback(() =>
        Object.keys(user).length && user.product !== "premium" ? false : true
    ,[user])

    return (
        <AlertProvider>
            <AddPlaylistProvider>
                <>
                    <WrapperComponent>
                        <Header/>
                        <Component/>
                        {!userIsPremium() ? <NotPremium/> : <></>}
                        <StickyElements>
                            <Alerts/>
                            <NowPlaying/>
                        </StickyElements>
                    </WrapperComponent>
                    <AddPlaylist/>
                </>
            </AddPlaylistProvider>
        </AlertProvider>
    )
}

export default PrivateRoute

const WrapperComponent = styled.div`
    min-height: 100%;
    display: flex;
    flex-flow: column nowrap;
`

const StickyElements = styled.div`
    width: 100%;
    position: sticky;
    bottom: 0;
    right: 0;
    z-index: 2;
`