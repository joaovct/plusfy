import React, { useState, useEffect, useMemo } from 'react'
import { Page, Container, Title as title } from '../../styles/style'
import styled from 'styled-components'
import api from '../../services/api'
import { useSelector } from 'react-redux'
import { Istore } from '../../store/types'
import { Itoken } from '../../store/token/types'
import qs from 'query-string'

const MyLibrary = () => {
    // const [playlists, setPlaylists] = useState([])
    const [search, setSearch] = useState('')
    const accessToken = useSelector<Istore, Itoken['accessToken']>(store => store.token.accessToken)

    const playlists = useMemo(() => {
        async function fetchData(){
            const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
            const body = qs.stringify({limit: 50})
            const data = await api.spotify.get(`/me/playlists?${body}`, headers)
            console.log(data)
         }
         fetchData()
    },[accessToken])

    useEffect(() => {
        console.log(playlists)
    },[playlists])

    useEffect(() => {
        console.log(1)
    })

    return(
        <Page>
            <Container>
                <Title>Minha biblioteca</Title>
            </Container>
        </Page>
    )
}

const Title = styled(title)`
    text-align: left;
`

export default MyLibrary