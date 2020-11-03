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
        <AddPlaylistProvider>
            <>
                <WrapperComponent>
                    <Header/>
                    <Component/>
                    {userIsPremium()
                        ? <></>
                        : <NotPremium/>
                    }
                    <NowPlaying/>
                </WrapperComponent>
                <AddPlaylist/>
            </>
        </AddPlaylistProvider>
    )
}

export default PrivateRoute

const WrapperComponent = styled.div`
    min-height: 100%;
    display: flex;
    flex-flow: column nowrap;
`