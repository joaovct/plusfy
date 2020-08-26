import React, { useState, useEffect, FunctionComponent } from 'react'
import SocketIoContext from '../../contexts/socket-io-context'
import socketIOClient from 'socket.io-client'
import { Page, Container, Title, spacing4} from '../../styles/style'
import styled from 'styled-components'
import HeaderHome from './HeaderHome'
import SearchHome from './SearchHome'
import NavigateHome from './NavigateHome'
import actions from '../../actions/actions'
import { useDispatch, useSelector } from 'react-redux'

interface IComponent{
    user_id: string
    access_token: string
}

interface Isocket{
    socket?: SocketIOClient.Socket
}

const Home: FunctionComponent<IComponent> = ({access_token}) => {
    const [socket, setSocket] = useState<Isocket>({})
    const dispatch = useDispatch()
    const store = useSelector(store => store)

    useEffect(() => {
        dispatch(actions.userAction(access_token))
        setSocket({socket: socketIOClient(process.env.REACT_APP_SERVER_URL || '')})
    //eslint-disable-next-line
    },[])

    useEffect(() => {
        console.log(store)
    },[store])

    return(
        <SocketIoContext.Provider value={socket}>
            <Page>
                <Container>
                    <HeaderHome/>
                    <Main>
                        <Title>Olá, João Victor</Title>
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
    padding: calc(${spacing4} * 4) 0 0 0;

    @media(max-width: 768px){
        padding: calc(${spacing4} * 3) 0 0 0;
    }
    @media(max-width: 576px){
        padding: calc(${spacing4} * 2) 0 0 0;
    }
`