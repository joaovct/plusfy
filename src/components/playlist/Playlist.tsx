import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { fetchPlaylist } from '../../api/webapi/webAPI'
import { useSelector } from 'react-redux'
import { IStore } from '../../store/types'
import { IToken } from '../../store/token/types'
import { IPlaylist } from '../../api/webapi/types'
import HeaderPlaylist from './HeaderPlaylist'
import TablePlaylist from './TablePlaylist'
import ContextPlaylist from './ContextPlaylist'

const Playlist = () => {
    const { id } = useParams<{id: string}>()    
    const [playlist, setPlaylist] = useState<IPlaylist>()
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const history = useHistory()

    useEffect(() => {
        if(id && accessToken)
            fetchData()
        async function fetchData(){
            const data = await fetchPlaylist(accessToken, id)
            return data ? setPlaylist(data) : !data && id && accessToken ? history.push("/invalid-id") : null
        }
    },[id, accessToken, history])

    const updatePlaylists = useCallback(async () => {
        const data = await fetchPlaylist(accessToken, id)
        if(data) setPlaylist(data)
    },[id, accessToken])

    return( 
        <ContextPlaylist.Provider value={{updatePlaylists}}>
            <WrapperComponent>
                {
                    playlist
                    ? <>
                        <HeaderPlaylist playlist={playlist}/> 
                        <TablePlaylist playlist={playlist}/>
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