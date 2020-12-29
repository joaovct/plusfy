import React, { useContext, useEffect, useState } from 'react'
import { Button, colors, metrics, Dropdown as dropdown, breakpoints } from '../../../styles/style'
import styled from 'styled-components'
import {MoreHorizontal, Heart} from 'react-feather'
import { playPlayer } from '../../../common/api/webapi/player'
import { useSelector } from 'react-redux'
import { IStore } from '../../../redux/store/types'
import { IToken } from '../../../redux/store/token/types'
import ContextPlaylist from '../ContextPlaylist'
import useAddToPlaylist from '../../../common/hooks/components/addPlaylist/useAddToPlaylist'
import { checkUserFollowPlaylist, followPlaylist, unfollowPlaylist } from '../../../common/api/webapi/follow'
import { IUser } from '../../../redux/store/user/types'

const HeaderPlaylistButtons = () => {
    const {playlist} = useContext(ContextPlaylist)
    const [showOptions, setShowOptions] = useState(false)
    const [isPlaylistFollowed, setIsPlaylistFollowed] = useState(false)
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const {id: userId = ''} = useSelector<IStore, IUser>(store => store.user)
    const addToPlaylist = useAddToPlaylist()

    useEffect(() => {
        if(playlist && accessToken)
            fetchData()
        async function fetchData(){
            const res = await checkUserFollowPlaylist(accessToken, {playlistId: playlist?.id || '', usersId: [userId]})
            setIsPlaylistFollowed(res[0] ? true : false)
        }
    },[playlist, accessToken, userId])

    const toggleOptions = () => setShowOptions(old => !old)

    const handlePlayPlaylist = () => {
        if(playlist)
            playPlayer({accessToken, contextUri: playlist.uri})
    }

    const clickHeart = () => {
        if(playlist){
            if(isPlaylistFollowed){
                unfollowPlaylist(accessToken, {playlistId: playlist.id})
                return setIsPlaylistFollowed(false)
            }
            followPlaylist(accessToken, {playlistId: playlist.id, isPublic: true})
            return setIsPlaylistFollowed(true)       
        }
    }

    const copyPlaylist = () => {
        if(playlist){
            const uris = playlist?.tracks.items.map(item => item.track.uri)
            addToPlaylist('track', uris)
        }
    }

    return (
        <WrapperButtons>
            <Button onClick={handlePlayPlaylist}>Play</Button>
            <WrapperOptions>
                {
                    playlist?.owner.id !== userId ?
                        <ButtonIcon followed={isPlaylistFollowed} title="Seguir playlist" onClick={clickHeart}>
                            <Heart/>
                        </ButtonIcon>
                    : <></>
                }
                <MoreOptions>
                    <figure onClick={toggleOptions}>
                        <MoreHorizontal/>
                    </figure>
                    <Dropdown show={showOptions}>
                        <li onClick={copyPlaylist}>
                            <span>Copiar playlist</span>
                        </li>
                    </Dropdown>
                </MoreOptions>
            </WrapperOptions>
        </WrapperButtons>
    )
}

export default HeaderPlaylistButtons

const Dropdown = styled(dropdown)`
    top: calc(100%);

    li{
        cursor: pointer;
    }

    @media(max-width: ${breakpoints.sml}){
        left: inherit;
    }
`

const MoreOptions = styled.div`
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-end;
    --size-icon: 25px;
    --spacing-icon: 15px;

    figure{
        height: calc( var(--size-icon) + var(--spacing-icon) ); 
        width: calc( var(--size-icon) + var(--spacing-icon) );
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: 1px solid ${colors.border};
        border-radius: 100%;

        svg{
            height: var(--size-icon);
            width: var(--size-icon);
            transition: .25s opacity;
            opacity: .7;
        } 

        &:hover svg{
            opacity: 1;
        }
    }
`

const ButtonIcon = styled.button<{followed?: boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 ${metrics.spacing3} 0 0;

    svg{
        transition: .15s;
        opacity: .7;
        height: 30px;
        width: 30px;
        cursor: pointer;

        ${({followed}) => {
            if(followed)
                return`
                    stroke: ${colors.primary};
                    color: ${colors.primary};
                    fill: ${colors.primary};
                    opacity: 1;
                `
        }}
    }

    &:hover svg{
        opacity: 1;
    }
`

const WrapperOptions = styled.div`
    display: flex;
    flex-flow: row nowrap;

    @media(max-width: ${breakpoints.sml}){
        width: 100%;
        justify-content: center;
        margin: ${metrics.spacing3} 0 0 0;
    }
`

const WrapperButtons = styled.div`
    margin: ${metrics.spacing3} 0 0 0;
    display: flex;

    ${Button}{
        min-width: inherit;
        padding-top: 8px;
        padding-bottom: 8px;
        margin: 0 ${metrics.spacing3} 0 0;
    }

    @media(max-width: ${breakpoints.tbp}){
        justify-content: center;

        ${Button}{
            padding-top: 4px;
            padding-bottom: 4px;
        }
    }

    @media(max-width: ${breakpoints.sml}){
        flex-flow: column nowrap;
        align-items: center;
        ${Button}{
            width: 150px;
            max-width: 100%;
            padding-top: 8px;
            padding-bottom: 8px;
            margin-right: 0;
        }
    }
`