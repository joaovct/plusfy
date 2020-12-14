import React from 'react'
import { useSelector } from 'react-redux'
import {IStore} from '../../redux/store/types'
import {IUser} from '../../redux/store/user/types'
import styled from 'styled-components'
import { Page as page, Container as container, Title} from '../../styles/style'
import SearchHome from './SearchHome'
import NavigateHome from './NavigateHome'

const Home = () => {
    const user = useSelector<IStore, IUser>(store => store.user)

    return(
        <Main>
            <Page>
                <Container>
                    <Title>Olá, {user.display_name}</Title>
                    <SearchHome/>
                </Container>
            </Page>
            <NavigateHome/>
        </Main>
    ) 
}

export default Home

const Main = styled.main`
    width: 100%;
    flex: 1 1 auto;
    padding: 0 0 0 0;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
`

const Container = styled(container)`
    flex: 0 0 auto;
    display: flex;
    flex-flow: column nowrap;
`

const Page = styled(page)`
    flex: 0 0 auto;
`