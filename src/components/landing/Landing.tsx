import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { Page as page, Container as container, primaryGradient, Button, spacing2, spacing4 } from '../../styles/style'
import logo from '../../assets/logo-white.png'


const Landing = () => (
    <>
        <Page>
            <Container>
                <HeaderLogo>
                    <img src={logo} alt="Plusfy"/>
                </HeaderLogo>
                <PageContent>
                    <h1>O seu <span>Spotify</span> já conhecido, <br/> mas <span>com novas funções.</span></h1>
                    <Link to="/login"><Button>Continuar com spotify</Button></Link>
                </PageContent>
            </Container>
        </Page>
    </>
)

const PageContent = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    margin-top: ${spacing2};

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
        margin-top: ${spacing4};
    }
`

const HeaderLogo = styled.div`
    width: 100%;
    display: flex;

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
    background: ${primaryGradient};
`

export default Landing