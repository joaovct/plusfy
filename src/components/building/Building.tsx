import React from 'react'
import { Page as page, Container as container, Title, Logo as logo, metrics } from '../../styles/style'
import styled from 'styled-components'
import logoImg from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const Building = () => (
    <Page>
        <Container>
            <Link to="/home">
                <Logo src={logoImg}/>
            </Link>
            <Content>
                <Title>
                    Parece que você chegou cedo.
                </Title>
                <p>
                    Lamentamos, mas essa página ainda está em construção. <br/>
                    Logo logo estará prontinha para você aproveitar novas funcionalidades <span role="img" aria-label="Construction emojis">🚧👷🏽‍♀</span>. 
                </p>
            </Content>
            
        </Container>
    </Page>
)

const Logo = styled(logo)`
    margin: ${metrics.spacing3} 0 0 0;
`

const Content = styled.main`
    margin: auto 0;
    
    ${Title}{
        font-size: 50px;
        text-align: left;
        line-height: 1.2;
    }

    p{
        font-size: 26px;
        margin: 20px 0 0 0;
    }
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

export default Building