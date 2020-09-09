import React, { useState, useEffect, useCallback, ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import { fetchUserPlaylists } from '../../api/webapi/webapi'
import {Istore} from '../../store/types'
import {Itoken} from '../../store/token/types'
import {IplaylistItem} from '../../api/webapi/types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { spacing2, spacing4, spacing5, Input as input } from '../../styles/style'
import emptyPlaylistPhoto from '../../assets/empty-playlist-photo.svg'
import {XCircle, Loader, Slash, HelpCircle} from 'react-feather'
import {Search} from 'react-feather'

const ListPlaylists = () => {
    const accessToken = useSelector<Istore, Itoken['accessToken']>(store => store.token.accessToken)
    const [playlists, setPlaylists] = useState<IplaylistItem[]>([])
    const [nounFilteredPlaylists, setNounFilteredPlaylists] = useState<IplaylistItem[]>([])
    const [requestStatus, setRequestStatus] = useState('loading')
    const [search, setSearch] = useState('')

    useEffect(() => {
        if(accessToken){
            fetchData()
        }
        async function fetchData(){
            const response = await fetchUserPlaylists(accessToken)
            setRequestStatus(response.status)
            setPlaylists(response.items)
            setNounFilteredPlaylists(response.items)
        }
    },[accessToken])

    useEffect(() => {
        if(search){
            return setPlaylists( nounFilteredPlaylists.filter(item => {
                return item.name.toLowerCase().search(search.toLowerCase()) > -1
            }))
        }
        setPlaylists( nounFilteredPlaylists )
    },[search, nounFilteredPlaylists])

    const updateSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    },[])

    return(
        <Wrapper>
            {
                requestStatus === 'loading' ? 
                    <LoadingStatus>
                        <Loader />
                    </LoadingStatus>

                : requestStatus === 'fail' ? 
                    <figure>
                        <XCircle/>
                        <p>Desculpe, tivemos um erro ao carregar as suas playlists.</p>
                    </figure>

                : requestStatus === 'empty' ? 
                    <figure>
                        <Slash/>
                        <p>Parece que você ainda não tem nenhuma playlist.</p>
                    </figure>
                
                : <>
                    <Label>
                        <Search/>
                        <Input onInput={updateSearch} type="text" placeholder="Pesquisar por suas playlists..."/>
                    </Label>
                    <WrapperPlaylists>
                        {
                        playlists.map(item => (
                            <PlaylistItem key={item.uri}>
                                <Link to={`/playlist/${item.id}`}>
                                    <figure>
                                        <img src={item.images.length ? item.images[0].url : emptyPlaylistPhoto} alt={`Playlist ${item.name}`} />
                                    </figure>
                                </Link>
                                <span>
                                    <Link to={`/playlist/${item.id}`}>{item.name}</Link>
                                </span>
                            </PlaylistItem>
                        ))
                        }
                        {
                            !playlists.length ?
                            <figure>
                                <HelpCircle/>
                                <p>Não encontramos nenhuma playlist com esse nome.</p>
                            </figure>
                            : <></>
                        }
                    </WrapperPlaylists>
                </>
            }
        </Wrapper>
    )
}

export default ListPlaylists

const Input = styled(input)`
    padding-left: calc(40px + 16px);
`

const Label = styled.label`
    position: relative;
    display: flex;
    align-items: center;

    svg{
        position: absolute;
        height: 24px;
        width: 24px;
        left: calc(40px - 16px);
    }
`

const PlaylistItem = styled.li`
    height: 100%;
    width: 100%;
    position: relative;
    opacity: 0;
    animation: fadeIn 1s forwards;

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

const LoadingStatus = styled.figure`
    svg{
        animation: rotation 3s infinite linear;
        @keyframes rotation{
            from{
                transform: rotate(0deg);
            }
            to{
                transform: rotate(359deg);
            }
        }
    }
`

const WrapperPlaylists = styled.ul`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;
    column-gap: ${spacing5};
    row-gap: ${spacing5};
    position: relative;
    margin: ${spacing5} 0 0 0;
    position: relative;

    & > figure{
        position: absolute;
    }

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

const Wrapper = styled.div`
    margin: ${spacing5} 0 0 0;

    & > figure,
    ${WrapperPlaylists} > figure{
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        padding-top: ${spacing4};

        opacity: 0;
        animation: fadeIn 1s forwards;

        @keyframes fadeIn{
            from{
                opacity: 0;
            }
            to{
                opacity: 1;
            }
        }

        svg{
            height: 75px;
            width: 75px;
        }

        p{
            font-size: 20px;
            text-align: center;
            margin: ${spacing4} 0 0 0;
        }
    }
`
