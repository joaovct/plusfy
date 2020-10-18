import styled from 'styled-components'
import * as colors from './colors'
import * as metrics from './metrics'
import GlobalStyles from './GlobalStyles'

export {colors,metrics,GlobalStyles}

export const Page = styled.section`
    flex: 1;
    width: 100%;
    padding: 0 ${metrics.spacing5} ${metrics.spacing3} ${metrics.spacing5}; 
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

export const Dropdown = styled.ul<{show: Boolean}>`
    border: 1px solid ${colors.border};
    border-radius: 14px;
    margin: 10px 0 0 0;
    box-shadow: ${metrics.boxShadow};
    transition: .5s opacity;
    opacity: 0;
    pointer-events: none;
    user-select: none;
    position: absolute;
    z-index: 2;
    min-width: 175px;
    top: 0;
    left: 0;
    background: ${colors.background};

    ${ ({show}) => 
    show ? `
        opacity: 1;
        pointer-events: all;
        user-select: text;
    ` : ''
    }

    li a, li span{
        display: block;
        text-align: left;   
        font-size: 16px;
        padding: 12px 16px;
    }
`