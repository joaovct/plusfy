import React from 'react'
import styled from 'styled-components'
import {Title, spacing2, spacing4, spacing5, borderColor} from './../../styles/style'
import {Music, Smile, Star, Upload} from 'react-feather'

const NavigateHome = () => {

    return(<>
        <TitleNavegate>Navegar</TitleNavegate>
        <WrapperItens>
            <Item>
                <a href="/home"><figure><Music/></figure></a>
                <span><a href="/home">Minha biblioteca</a></span>
            </Item>
            <Item>
                <a href="/home"><figure><Smile/></figure></a>
                <span><a href="/home">Medidor de humor</a></span>
            </Item>
            <Item>
                <a href="/home"><figure><Star/></figure></a>
                <span><a href="/home">Estilos preferidos</a></span>
            </Item>
            <Item>
                <a href="/home"><figure><Upload/></figure></a>
                <span><a href="/home">Importar músicas</a></span>
            </Item>
        </WrapperItens>
    </>)
}

const Item = styled.li`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin: 0 calc(${spacing4} * 2) 0 0;
    & > a{
        display: block;
        height: 110px;
        width: 110px;
        padding: 10px;
        border: 1px solid ${borderColor};
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
        margin: calc(${spacing2}*2) 0 0 0;
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
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

    @media(max-width: 991px){
        margin: 0 ${spacing4} 0 0;
    } 
    @media(max-width: 768px){
        max-width: 100px;
        & > a{
            height: 100px;
            width: 100px;
            figure svg{
                height: 45px;
                width: 45px;
            }
        }
        span{
            font-size: 15px;
        }
    }
    @media(max-width: 576px){
        margin-bottom: ${spacing4};
    }
    @media(max-width: 480px){
        max-width: inherit;
        margin-bottom: calc(${spacing4} * 2);
        & > a{
            height: 125px;
            width: 125px;
            figure svg{
                height: 65px;
                width: 65px;
            }
        }
        span{
            font-size: 21px;
        }
    }
`

const WrapperItens = styled.ul`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    margin: ${spacing4} 0 0 0;

    @media(max-width: 991px){
        margin: calc( ${spacing4} / 1.5 ) 0 0 0;
    }
    @media(max-width: 480px){
        flex-flow: column nowrap;
        margin: ${spacing4} 0 0 0;
    }
`

const TitleNavegate = styled(Title)`
    margin: calc(${spacing5}) 0 0 0;

    @media(min-height: 769px) and (min-width: 992px){
        margin: calc(${spacing5} * 2) 0 0 0;
    }
    @media(min-height: 991px) and (min-width: 992px){
        margin: calc(${spacing5} * 3) 0 0 0;
    }
    @media(max-height: 768px) and (min-width: 992px){
        margin: calc(${spacing5} * 1.5) 0 0 0;
    }
    @media(max-height: 576px) and (min-width: 992px){
        margin: calc(${spacing5} * 1) 0 0 0;
    }

    @media(max-width: 768px){
        margin: ${spacing5} 0 0 0;
    }
    @media(max-width: 576px){
        margin: ${spacing4} 0 0 0;
    }
`

export default NavigateHome