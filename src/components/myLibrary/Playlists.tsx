import React, { useState, useEffect, ChangeEvent, useRef } from 'react'
import { useSelector } from 'react-redux'
import { fetchUserPlaylists } from '../../common/api/webapi/playlists'
import {IStore} from '../../redux/store/types'
import {IToken} from '../../redux/store/token/types'
import {Playlist} from '../../common/api/webapi/types'
import styled from 'styled-components'
import { metrics, Input as input, breakpoints } from '../../styles/style'
import {XCircle, Loader, Slash, HelpCircle} from 'react-feather'
import {Search} from 'react-feather'
import ListPlaylists from '../common/listPlaylists/ListPlaylists'

const Playlists = () => {
    const accessToken = useSelector<IStore, IToken['accessToken']>(store => store.token.accessToken)
    const [playlists, setPlaylists] = useState<Playlist[]>([])
    const [nounFilteredPlaylists, setNounFilteredPlaylists] = useState<Playlist[]>([])
    const [requestStatus, setRequestStatus] = useState('loading')
    const [search, setSearch] = useState('')
    const isMounted = useRef(true)

    const updateSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        return () => {isMounted.current = false}
    },[])

    useEffect(() => {
        if(accessToken)
            fetchData()
        async function fetchData(){
            const response = await fetchUserPlaylists(accessToken)
            if(isMounted.current){
                setRequestStatus(response.status)
                setPlaylists(response.items)
                setNounFilteredPlaylists(response.items)
            }
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
                        {
                            playlists.length ?
                            <ListPlaylists playlists={playlists}/>
                            :
                            <NotFound>
                                <HelpCircle/>
                                <p>Não encontramos nenhuma playlist com esse nome.</p>
                            </NotFound>
                        }
                </>
            }
        </Wrapper>
    )
}

export default Playlists

const NotFound = styled.figure`
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
`

const Input = styled(input)`
    padding-left: calc(${metrics.spacing5} + 16px);

    @media(max-width: ${breakpoints.tbp}){
        padding-left: calc(${metrics.spacing4} + 20px);
    }
`

const Label = styled.label`
    padding-top: 0;
    position: relative;
    display: flex;
    align-items: center;

    svg{
        position: absolute;
        height: 24px;
        width: 24px;
        left: calc(40px - 16px);
        color: #000;
        *{
            color: #000;
        }
    }

    @media(max-width: ${breakpoints.tbp}){
        svg{
            height: 20px;
            width: 20px;
            left: calc(40px - 24px);
        }
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
    margin: ${metrics.spacing3} 0 0 0;

    @media(max-width: ${breakpoints.tbp}){
        margin-top: ${metrics.spacing2};
    }
`
