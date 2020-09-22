import React from 'react'
import useConnectSocket from '../../hooks/useConnectSocket'
import { useSelector } from 'react-redux'
import {Istore} from '../../store/types'
import {Iuser} from '../../store/user/types'
import SocketIoContext from '../../contexts/socket-io-context'
import styled from 'styled-components'
import { Page, Container, Title} from '../../styles/style'
import SearchHome from './SearchHome'
import NavigateHome from './NavigateHome'
import usePlaybackSDK from '../../hooks/usePlaybackSDK'

const Home = () => {
    usePlaybackSDK()
    const socket = useConnectSocket()
    const user = useSelector<Istore, Iuser>(store => store.user)
    

    return(
        <SocketIoContext.Provider value={socket}>
            <Page>
                <Container>
                    <Main>
                        <Title>Olá, {user.display_name}</Title>
                        <SearchHome/>
                        <NavigateHome/>
                    </Main>
                </Container>
            </Page>
        </SocketIoContext.Provider> 
    ) 
}

export default Home

const Main = styled.main`
    height: 100%;
    padding: 0 0 0 0;
`