import {createGlobalStyle} from 'styled-components'
import {breakpoints, colors, metrics} from './style'

const GlobalStyles = createGlobalStyle`
    :root{
        --opacityInputDisabled: .6;
        --spacingSidesPage: ${metrics.spacing5};

        @media(max-width: ${breakpoints.tbl}){
            --spacingSidesPage: ${metrics.spacing4};
        }
        @media(max-width: ${breakpoints.sml}){
            --spacingSidesPage: ${metrics.spacing3};
        }
    }

    /* width */
    &::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: ${colors.darkerBackground};
    }
    
    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: ${colors.border}; 

        &:hover{
            background: ${colors.gray};
        }
    }
    
    html, body, #root{
        height: 100%;
        min-height: 100vh;
        min-height: -webkit-fill-available;
        width: 100%;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
    }

    body{
        background: ${colors.background};
    }

    table{
        border-collapse: collapse;
        border-spacing: 0;
    }

    table, caption, tbody, tfoot, thead, tr, th, td {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
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
        background: none;
        border: none;
        margin: 0;
        padding: 0;
        outline: 0;
        appearance: none;
        &:focus{
            outline: 0;
        }
        @media(max-width: ${breakpoints.tbp}){
            -webkit-tap-highlight-color: transparent;
        }
    }

    img, svg{
        user-select: none;
        user-drag: none;
    }

    h1{
        font-size: 40px;
        font-weight: 600;
        line-height: 49px;
    }
`

export default GlobalStyles