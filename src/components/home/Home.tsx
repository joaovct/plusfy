import React from 'react'
import { useSelector } from 'react-redux'
import {IStore} from '../../store/types'
import {IUser} from '../../store/user/types'
import styled from 'styled-components'
import { Page, Container, Title} from '../../styles/style'
import SearchHome from './SearchHome'
import NavigateHome from './NavigateHome'

const Home = () => {
    const user = useSelector<IStore, IUser>(store => store.user)

    return(
        <Page>
            <Container>
                <Main>
                    <Title>Olá, {user.display_name}</Title>
                    <SearchHome/>
                    <NavigateHome/>
                </Main>
            </Container>
        </Page>
    ) 
}

export default Home

const Main = styled.main`
    height: 100%;
    padding: 0 0 0 0;
`