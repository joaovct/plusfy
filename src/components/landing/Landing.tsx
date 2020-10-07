import React, { useEffect } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { Page as page, Container as container, colors, Button, metrics} from '../../styles/style'
import logo from '../../assets/logo-white.png'
import { useSelector } from 'react-redux'

const Landing = () => {

    const store = useSelector(store => store)

    useEffect(() => {
        console.log(store)
    },[store])

        return (
        <Page>
            <Header>
                    <img src={logo} alt="Plusfy"/>
            </Header>
            <Container>
                <Main>
                    <h1>O seu <span>Spotify</span> já conhecido, <br/> mas <span>com novas funções.</span></h1>
                    <Link to="/login"><Button>Continuar com spotify</Button></Link>
                </Main>
            </Container>
        </Page>
    )
    }

const Main = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    margin-top: ${metrics.spacing2};

    h1{
        color: rgba(255,255,255,.6);
        text-align: center;
        span{
            color: white;
        }

        @media(max-width: 768px){
            font-size: 35px;
        }

        @media(max-width: 576px){
            font-size: 30px;
            text-align: left;
            line-height: inherit;
        }
    }

    ${Button}{
        margin-top: ${metrics.spacing4};
    }
`

const Header = styled.div`
    width: 100%;
    display: flex;
    padding: ${metrics.spacing3} ${metrics.spacing5} ${metrics.spacing5} ${metrics.spacing5};

    img{
        width: 150px;
    }

    @media(max-width: 768px){
        justify-content: center;
        img{
            width: inherit;
            max-width: 200px;
        }
    }

    @media(max-width: 576px){
        img{
            width: inherit;
            max-width: 175px;
        }
    }
`

const Container = styled(container)`
    display: flex;
    flex-flow: column nowrap;
`

const Page = styled(page)`
    min-height: inherit;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: ${colors.primaryGradient};
`

export default Landing