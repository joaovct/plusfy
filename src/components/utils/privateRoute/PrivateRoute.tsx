import React, { useCallback } from 'react'
import { IPrivateRoute } from '../routes/types'
import { useSelector } from 'react-redux'
import { IStore } from '../../../redux/store/types'
import { IUser } from '../../../redux/store/user/types'
import NotPremium from './NotPremium'
import useDispatchUser from '../../../common/hooks/state/useDispatchUser'
import useDispatchToken from '../../../common/hooks/state/useDispatchToken'
import Header from './Header'
import styled from 'styled-components'
import useCurrentState from '../../../common/hooks/state/useCurrentState'
import usePlaybackSDK from '../../../common/hooks/state/useDispatchSpotifyPlayer'
import AddToPlaylistProvider from '../../../common/providers/AddToPlaylistProvider'
import AddPlaylist from '../../common/addPlaylist/AddPlaylist'
import AlertProvider from '../../../common/providers/AlertProvider'
import Alerts from '../../common/alerts/Alerts'
import NowPlaying from '../../common/nowPlaying/NowPlaying'
import TabBar from '../../common/tabBar/TabBar'
import { PrivateRouteComponent } from '../../../styles/style'
import GlobalStylesProvider from '../../../common/providers/GlobalStylesProvider'
import GlobalStylesManager from '../../common/globalStylesManager/GlobalStylesManager'

const PrivateRoute: React.FC<IPrivateRoute> = ({Component, accessToken, refreshToken, expiresIn}) => {
    useDispatchToken(accessToken, refreshToken, expiresIn)
    usePlaybackSDK()
    useCurrentState()
    useDispatchUser()
    const user = useSelector<IStore, IUser>(store => store.user)

    const userIsPremium = useCallback(() =>
        Object.keys(user).length && user.product !== "premium" ? false : true
    ,[user])

    return (
        <GlobalStylesProvider>
            <AlertProvider>
                <AddToPlaylistProvider>
                    <>
                        <GlobalStylesManager/>
                        <PrivateRouteComponent>
                            <Header/>
                            <Component/>
                            {!userIsPremium() ? <NotPremium/> : <></>}
                            <StickyElements>
                                <Alerts/>
                                <NowPlaying/>
                                <TabBar/>
                            </StickyElements>
                        </PrivateRouteComponent>
                        <AddPlaylist/>
                    </>
                </AddToPlaylistProvider>
            </AlertProvider>
        </GlobalStylesProvider> 
    )
}

// const PrivateRouteComponent = styled(privateroutecomponent)<{pathname: string}>`
//     ${({pathname}) => {
//         if(pathname !== '/mood'){
//             return `
//                 &:nth-child(n+0){
//                     background-image: inherit;
//                     background: inherit;
//                     animation: inherit;
//                 }
//             `
//         }
//     }}
// `

const StickyElements = styled.div`
    width: 100%;
    position: sticky;
    bottom: 0;
    right: 0;
    z-index: var(--zIndexSticky);
`

export default PrivateRoute
