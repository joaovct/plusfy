import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Istore } from '../../store/types'
import { Itoken } from '../../store/token/types'
import {fetchUserPlaylists} from '../../api/webapi/webapi'
import {IplaylistItem} from '../../api/webapi/types'
import { Page as page, Container, Title as title, spacing2, spacing5 } from '../../styles/style'
import emptyPlaylistPhoto from '../../assets/empty-playlist-photo.svg'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const MyLibrary = () => {
    const accessToken = useSelector<Istore, Itoken['accessToken']>(store => store.token.accessToken)
    const [playlists, setPlaylists] = useState<IplaylistItem[]>([])

    useEffect(() => {
        fetchData()
        async function fetchData(){
            setPlaylists( await fetchUserPlaylists(accessToken) )
        }
    },[accessToken])

    return(
        <Page>
            <Container>
                <Main>
                    <Title>Minha biblioteca</Title>
                    <WrapperItens>
                        {
                            playlists.map(item => (
                                <Item key={item.uri}>
                                    <Link to={`/playlist/${item.id}`}>
                                        {
                                            <figure>
                                                {
                                                    <img src={item.images.length ? item.images[0].url : emptyPlaylistPhoto} alt={`Playlist ${item.name}`} />
                                                }
                                            </figure>
                                        }
                                    </Link>
                                    <span>
                                        <Link to={`/playlist/${item.id}`}>{item.name}</Link>
                                    </span>
                                </Item>
                            ))
                        }
                    </WrapperItens>
                </Main>
            </Container>
        </Page>
    )
}

const Item = styled.li`
    height: 100%;
    width: 100%;
    position: relative;

    & > a{
        position: relative;
        
        figure{
            height: auto;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 3px 15px 10px rgba(0,0,0,0.12);
            border-radius: 12px;
            background: #353535;

            img{
                height: 100%;
                width: 100%;
                border-radius: 12px;
                object-fit: contain;
            }
        }
    }

    span{
        display: block;
        width: 100%;
        margin: ${spacing2} 0 0 0;
        font-size: 24px;
        text-align: center;

        @media(max-width: 768px){
            font-size: 24;
        }

        @media(max-width: 576px){
            font-size: 26px;
        }
    }
`

const WrapperItens = styled.ul`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;
    column-gap: ${spacing5};
    row-gap: ${spacing5};
    margin: ${spacing5} 0 0 0;

    @media(max-width: 1200px){
        grid-template-columns: repeat(4, 1fr);
    }

    @media(max-width: 991px){
        grid-template-columns: repeat(3, 1fr);
    }

    @media(max-width: 768px){
        grid-template-columns: repeat(2, 1fr);
    }

    @media(max-width: 576px){
        grid-template-columns: repeat(1, .7fr);
        justify-content: center;
    }

    @media(min-width: 1400px){
        grid-template-columns: repeat(6, 1fr);
    }
`

const Title = styled(title)`
    text-align: left;
`

const Main = styled.main`
    height: 100%;
    padding: 0 0 0 0;
`

const Page = styled(page)`
    @media(max-width: 768px){
        padding-top: 0;
    }
`

export default MyLibrary