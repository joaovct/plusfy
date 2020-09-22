import styled from 'styled-components'
import Colors from './colors'
import Metrics from './metrics'
import globalStyles from './GlobalStyles'

export const colors = Colors
export const metrics = Metrics
export const GlobalStyles = globalStyles

export const Page = styled.section`
    flex: 1;
    width: 100%;
    padding: 0 ${metrics.spacing5} ${metrics.spacing5} ${metrics.spacing5}; 
    color: #fff;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    @media(max-width: 768px){
        padding: 0 ${metrics.spacing4};
    }
`

export const Container = styled.section`
    height: 100%;
    width: 100%;
    max-width: ${metrics.maxWidthContainer};
`

export const Title = styled.h1`
    display: block;
    font-size: 40px;
    font-weight: 500;
    color: #fff;

    @media(max-width: 768px){
        font-size: 38px;
    }
    @media(max-width: 576px){
        font-size: 35px;
    }
`

export const Input = styled.input`
    width: 100%;
    padding: 16px 40px;
    border-radius: 24px;
    background: ${colors.border};
    font-size: 18px;
    color: #fff;
    @media(max-width: 768px){
        font-size: 16px;
    }

    &::placeholder{
        font-size: 18px;
        font-weight: 300;
        color: #fff;
        opacity: .39;
    }
`

export const Button = styled.button`
    display: inline-block;
    min-width: 300px;
    padding: 16px 40px;
    border-radius: 28px;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
    background: ${colors.green};
    cursor: pointer;
    transition: .25s;
    letter-spacing: 2px;

    &:hover{
        background: ${colors.lighterGreen};
    }

    @media(max-width: 576px){
        min-width: inherit;
    }
`

export const ButtonLink = styled(Button).attrs({as: "a"})`
    text-decoration: none;
`

export const Logo = styled.img`
    height: 70px;
    width: auto;
`