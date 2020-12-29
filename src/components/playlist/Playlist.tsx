import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { fetchPlaylist } from '../../common/api/webapi/playlists'
import { getSavedTracks } from '../../common/api/webapi/library'
import { useSelector } from 'react-redux'
import { IStore } from '../../redux/store/types'
import { IToken } from '../../redux/store/token/types'
import { Playlist as IPlaylist, SavedTracks } from '../../common/api/webapi/types'
import HeaderPlaylist from './headerPlaylist/HeaderPlaylist'
import PlaylistTracks from './tablePlaylist/PlaylistTracks'
import ContextPlaylist from './ContextPlaylist'

const Playlist = () => {
    const { id } = useParams<{id: string}>()    
    const [playlist, setPlaylist] = useState<IPlaylist | null>(null)
    const [savedTracks, setSavedTracks] = useState<SavedTracks | null>(null) 
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const history = useHistory()
    const isMounted = useRef(true)

    useEffect(() => {
        return () => {isMounted.current = false}
    },[isMounted])


    const updatePlaylist = useCallback(async () => {
        const response = await fetchPlaylist(accessToken, id)

        if(response && isMounted.current)
            return setPlaylist(response)
        else if(!response)
            history.push("/invalid-id")
    },[id, accessToken, history])

    const updateSavedTracks = useCallback(async () => {
        const response = await getSavedTracks({accessToken})
        if(response && isMounted.current)
            setSavedTracks(response)
        else if(isMounted.current)
            setSavedTracks(null)
    },[accessToken])

    useEffect(() => {
        if(accessToken && id)
            updatePlaylist()
    },[accessToken, id, updatePlaylist])

    useEffect(() => {
        if(accessToken && id)
            updateSavedTracks()
    },[accessToken, id, updateSavedTracks])


    return( 
        <ContextPlaylist.Provider value={{updatePlaylist, updateSavedTracks, playlist, savedTracks}}>
            <WrapperComponent>
                {
                    playlist
                    ? <>
                        <HeaderPlaylist/> 
                        <PlaylistTracks/>
                    </> : <></>
                }
            </WrapperComponent>
        </ContextPlaylist.Provider>
    )
}

export default Playlist

const WrapperComponent = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
`