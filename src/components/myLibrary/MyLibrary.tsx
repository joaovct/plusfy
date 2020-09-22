import React from 'react'
import { Page as page, Container, Title as title } from '../../styles/style'
import ListPlaylists from './ListPlaylists'
import styled from 'styled-components'

const MyLibrary = () => (
    <Page>
        <Container>
            <Main>
                <Title>Minha biblioteca</Title>
                <ListPlaylists/>
            </Main>
        </Container>
    </Page>
)


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