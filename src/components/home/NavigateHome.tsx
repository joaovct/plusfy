import React from 'react'
import styled from 'styled-components'
import {Title, metrics, colors, breakpoints, Page, Container} from './../../styles/style'
import {Music, Smile, Star, Upload} from 'react-feather'
import { Link } from 'react-router-dom'

const NavigateHome = () => {

    return(
        <Content>
            <PageTitle>
                <Container>
                    <Title>Navegar</Title>
                </Container>
            </PageTitle>
            <PageList>
                <Container>
                    <ListItens>
                        <Item>
                            <Link to="/my-library">
                                <figure><Music/></figure>
                            </Link>
                            <span>
                                <Link to="/my-library">Minha biblioteca</Link>
                            </span>
                        </Item>
                        <Item>
                            <Link to="/building">
                                <figure><Smile/></figure>
                            </Link>
                            <span>
                                <Link to="/building">Medidor de humor</Link>
                            </span>
                        </Item>
                        <Item>
                            <Link to="/favorites">
                                <figure><Star/></figure>
                            </Link>
                            <span>
                                <Link to="/favorites">Favoritos</Link>
                            </span>
                        </Item>
                        <Item>
                            <Link to="/import-tracks">
                                <figure><Upload/></figure>
                            </Link>
                            <span>
                                <Link to="/import-tracks">Importar músicas</Link>
                            </span>
                        </Item>
                    </ListItens>
                </Container>
            </PageList>
        </Content>
    )
}

const Item = styled.li`
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin: 0 calc(${metrics.spacing4} * 2) 0 0;

    & > a{
        display: block;
        height: 110px;
        width: 110px;
        padding: 10px;
        border: 1px solid ${colors.border};
        border-radius: 12px;
        figure{
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            &:before{
                content: '';
                height: 100%;
                width: 100%;
                position: absolute;
                border-radius: 12px;
                transition: .25s opacity;
            }
            &:hover:before{
                opacity: .5;
            }
            svg{
                height: 50px;
                width: 50px;
                stroke-width: 1px;
                position: relative;
            }
        }
    }
    span{
        display: inline-block;
        margin: calc(${metrics.spacing2}*2) 0 0 0;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 1;
        text-align: center;
    }

    &:nth-child(1) > a figure::before{
        background: linear-gradient(135deg, #3ADDB6 0%, #2ECE3E 100%);
    }
    &:nth-child(2) > a figure::before{
        background: linear-gradient(135deg, #8F37EA 20.83%, #E02E93 56.77%, #EA65B0 96.35%);
    }
    &:nth-child(3) > a figure::before{
        background: linear-gradient(226.59deg, #5775AD 0%, #A4C4FB 87.05%);
    }   
    &:nth-child(4) > a figure::before{
        background: linear-gradient(181.75deg, #FF0844 6.87%, #FF9A3E 95.37%);
    }

    @media(max-width: ${breakpoints.tbl}){
        max-width: 100px;

        & > a{
            height: 100px;
            width: 100px;

            figure svg{
                height: 45px;
                width: 45px;
            }
        }
    }

    @media(max-width: ${breakpoints.tbp}){
        margin-right: calc(${metrics.spacing4} * 1.5);

        &:last-child span{
            width: calc(100px + ${metrics.spacing4});
        }
    }

    @media(max-width: ${breakpoints.sml}){
        margin-right: ${metrics.spacing4};

        span{
            font-size: 14px;
        }
    }
`

const ListItens = styled.ul`
    min-height: 168px;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    margin: ${metrics.spacing2} 0 0 0;

    @media(max-width: ${breakpoints.tbp}){
        width: 100%;
        overflow-x: scroll;

        &::-webkit-scrollbar {
            width: 0px;
            background: transparent;
        }
    }
`

const PageList = styled(Page)`
    width: 100%;
    flex: 1 1 auto;
    overflow-x: hidden;

    @media(max-width: ${breakpoints.tbp}){
        max-width: inherit;
        padding-right: 0;

        ${Container}{
            max-width: inherit;
        }
    }
`

const PageTitle = styled(Page)`
    flex: 0 0 auto;
`

const Content = styled.div`
    flex: 1 0 0;
    width: 100%;
    margin: calc(${metrics.spacing5}) 0 0 0;
    display: flex;
    flex-flow: column nowrap;

    @media(min-height: 769px) and (min-width: 992px){
        margin: calc(${metrics.spacing5} * 2) 0 0 0;
    }
    @media(min-height: 991px) and (min-width: 992px){
        margin: calc(${metrics.spacing5} * 3) 0 0 0;
    }
    @media(max-height: 768px) and (min-width: 992px){
        margin: calc(${metrics.spacing5} * 1.5) 0 0 0;
    }
    @media(max-height: 576px) and (min-width: 992px){
        margin: calc(${metrics.spacing5} * 1) 0 0 0;
    }
    @media(max-width: 768px){
        margin: ${metrics.spacing5} 0 0 0;
    }
    @media(max-width: 576px){
        margin: ${metrics.spacing4} 0 0 0;
    }
`

export default NavigateHome