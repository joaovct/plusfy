import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { fetchPlaylist } from '../../common/api/webapi/playlists'
import { getSavedTracks } from '../../common/api/webapi/library'
import { useSelector } from 'react-redux'
import { IStore } from '../../redux/store/types'
import { IToken } from '../../redux/store/token/types'
import { IPlaylist, SavedTracks } from '../../common/api/webapi/types'
import HeaderPlaylist from './headerPlaylist/HeaderPlaylist'
import PlaylistTracks from './tablePlaylist/PlaylistTracks'
import ContextPlaylist from './ContextPlaylist'

const Playlist = () => {
    const { id } = useParams<{id: string}>()    
    const [playlist, setPlaylist] = useState<IPlaylist | null>(null)
    const [savedTracks, setSavedTracks] = useState<SavedTracks | null>(null) 
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const history = useHistory()

    const updatePlaylist = useCallback(async () => {
        const playlistResponse = await fetchPlaylist(accessToken, id)
        return playlistResponse
            ? setPlaylist(playlistResponse)
            : !playlistResponse && id && accessToken
                ? history.push("/invalid-id") : null
    },[id, accessToken, history])

    const updateSavedTracks = useCallback(async () => {
        const savedTracksResponse = await getSavedTracks({accessToken})
        return savedTracksResponse ? setSavedTracks(savedTracksResponse) : setSavedTracks(null)
    },[accessToken])

    useEffect(() => {updatePlaylist()},[updatePlaylist])
    useEffect(() => {updateSavedTracks()},[updateSavedTracks])

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