import styled, {createGlobalStyle} from 'styled-components'

export const backgroundColor = '#252A41'
export const primaryGradient = "linear-gradient(136.17deg, #3552D8 21.35%, #5B4CC0 55.81%, #7E46A9 70.48%, #C53A7D 92.22%);"
export const primaryColor = "#3552D8"
export const secondaryCOlor = "#C53A7D"
export const greenColor = "#1aa34a"
export const lighterGreenColor = "#18ac4d"
export const borderColor = '#3D4466'
export const spacer = '1rem'
export const spacing0 = '0'
export const spacing1 = `calc(${spacer} * .25)`
export const spacing2 = `calc(${spacer} * .5)`
export const spacing3 = `calc(${spacer} * 1)`
export const spacing4 = `calc(${spacer} * 1.5)`
export const spacing5 = `calc(${spacer} * 3)`
export const maxWidthContainer = '1400px'

export const GlobalStyle = createGlobalStyle`
    html, body, #root{
        height: 100%;
        min-height: 100vh;
    }
    html, body{
        width: 100%;
        margin: 0;
        padding: 0;
    }

    body{
        background: ${backgroundColor};
    }

    *{
        margin: 0;
        padding: 0;
        outline: 0;
        border: none;
        box-sizing: border-box;
        list-style: none;
        text-decoration: none;
        color: #fff;
    }

    *,
    button,
    input{
        font-family: Montserrat, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    h1{
        font-size: 40px;
        font-weight: 600;
        line-height: 49px;
    }
`

export const Page = styled.section`
    width: 100%;
    padding: 0 ${spacing5} ${spacing5} ${spacing5}; 
    color: #fff;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    @media(max-width: 768px){
        padding: ${spacing5} ${spacing4};
    }
`

export const Container = styled.section`
    height: 100%;
    width: 100%;
    max-width: ${maxWidthContainer};
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
    background: ${borderColor};
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
    background: ${greenColor};
    cursor: pointer;
    transition: .25s;
    letter-spacing: 2px;

    &:hover{
        background: ${lighterGreenColor};
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