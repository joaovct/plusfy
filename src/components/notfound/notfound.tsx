import React from 'react'
import { Page as page, Container as container, Title as title, Logo as logo, spacing3 } from '../../styles/style'
import styled from 'styled-components'
import logoImg from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const NotFound = () => (
    <Page>
        <Container>
            <Link to="/home">
                <Logo src={logoImg}/>
            </Link>
            <Title>
                Ops...<br></br>parece que não encontramos a página que você buscou.
                <span aria-label="Shrug emoji" role="img"> 🤷</span>
            </Title>
        </Container>
    </Page>
)

const Logo = styled(logo)`
    margin: ${spacing3} 0 0 0;
`

const Title = styled(title)`
    font-size: 50px;
    text-align: left;
    line-height: 1.2;
    margin: auto 0;
`

const Container = styled(container)`
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start;
`

const Page = styled(page)`
    height: 100%;
`

export default NotFound