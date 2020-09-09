import React, { useState, useEffect } from 'react'
import { Page, Container, Title } from '../../styles/style'
import { useParams, useHistory } from 'react-router-dom'
import { fetchPlaylist } from '../../api/webapi/webapi'
import { useSelector } from 'react-redux'
import { Istore } from '../../store/types'
import { Itoken } from '../../store/token/types'
import { IresponsePlaylist } from '../../api/webapi/types'

const Playlist = () => {
    const { id } = useParams()    
    const [playlist, setPlaylist] = useState<IresponsePlaylist>()
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
        <>
            <Page>
                <Container>
                    <Title>Playlist</Title>
                    {
                        playlist ? <>
                            <h1 style={{marginTop: 20}}>{playlist.name}</h1>
                            <img src={ playlist.images?.length ? playlist.images[0].url : '' } alt=""/>
                        </> : <></>
                    }
                </Container>
            </Page>
        </>
    )
}

export default Playlist