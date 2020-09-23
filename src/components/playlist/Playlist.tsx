import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { fetchPlaylist } from '../../api/webapi/webapi'
import { useSelector } from 'react-redux'
import { Istore } from '../../store/types'
import { Itoken } from '../../store/token/types'
import { Iplaylist } from '../../api/webapi/types'
import HeaderPlaylist from './HeaderPlaylist'
import TablePlaylist from './TablePlaylist'

const Playlist = () => {
    const { id } = useParams<{id: string}>()    
    const [playlist, setPlaylist] = useState<Iplaylist>()
    const {accessToken} = useSelector<Istore, Itoken>(store => store.token)
    const history = useHistory()

    useEffect(() => {
        if(id && accessToken){
            fetchData()
        } 
        async function fetchData(){
            const data = await fetchPlaylist(accessToken, id || '')

            if(data)
                return setPlaylist(data)
            else if(!data && id && accessToken)
                return history.push("/invalid-id")
        }
    },[id, accessToken, history])

    return( 
        <WrapperComponent>
            {
                playlist
                ? <>
                    <HeaderPlaylist playlist={playlist}/> 
                    <TablePlaylist playlist={playlist}/>
                </> : <></>
            }
            
        </WrapperComponent>
    )
}

export default Playlist

const WrapperComponent = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
`