import React, { useState, useEffect, useCallback, ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import { fetchUserPlaylists } from '../../common/api/webapi/playlists'
import {IStore} from '../../redux/store/types'
import {IToken} from '../../redux/store/token/types'
import {IPlaylist} from '../../common/api/webapi/types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { metrics, Input as input, Playlists as WrapperPlaylists, PlaylistItem } from '../../styles/style'
import emptyPlaylistPhoto from '../../assets/empty-playlist-photo.svg'
import {XCircle, Loader, Slash, HelpCircle} from 'react-feather'
import {Search} from 'react-feather'

const ListPlaylists = () => {
    const accessToken = useSelector<IStore, IToken['accessToken']>(store => store.token.accessToken)
    const [playlists, setPlaylists] = useState<IPlaylist[]>([])
    const [nounFilteredPlaylists, setNounFilteredPlaylists] = useState<IPlaylist[]>([])
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
                return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
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
                    <IconStatus status={requestStatus}>
                        <Loader />
                    </IconStatus>

                : requestStatus === 'fail' ? 
                    <IconStatus status={requestStatus}>
                        <XCircle/>
                        <p>Desculpe, tivemos um erro ao carregar as suas playlists.</p>
                    </IconStatus>

                : requestStatus === 'empty' ? 
                    <IconStatus status={requestStatus}>
                        <Slash/>
                        <p>Parece que você ainda não tem nenhuma playlist.</p>
                    </IconStatus>                
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
                                        <img src={item.images.length ? item.images[0].url : emptyPlaylistPhoto} alt={item.name} />
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

const IconStatus = styled.figure<{status: 'loading' | string}>`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    padding-top: ${metrics.spacing4};
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
        ${({status}) => status === 'loading' ? 'animation: rotation 3s infinite linear;' : '' }

        @keyframes rotation{
            from{
                transform: rotate(0deg);
            }
            to{
                transform: rotate(359deg);
            }
        }
    }
    
    p{
        font-size: 20px;
        text-align: center;
        margin: ${metrics.spacing4} 0 0 0;
    }
`



const Wrapper = styled.div`
    margin: ${metrics.spacing5} 0 0 0;

    ${WrapperPlaylists} > figure{
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        padding-top: ${metrics.spacing4};
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
            margin: ${metrics.spacing4} 0 0 0;
        }
    }
`
