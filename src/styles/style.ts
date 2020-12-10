import styled, { FlattenSimpleInterpolation, css } from 'styled-components'
import {ListTracksViewMode} from '../components/common/listTracks/types'
import * as colors from './colors'
import * as metrics from './metrics'
import * as breakpoints from './breakpoints'
import GlobalStyles from './GlobalStyles'

export {colors,metrics,breakpoints,GlobalStyles}

export const Page = styled.section`
    flex: 1;
    width: 100%;
    padding: 0 ${metrics.spacing5} ${metrics.spacing3} ${metrics.spacing5}; 
    color: #fff;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    @media(max-width: ${breakpoints.tbl}){
        padding: 0 ${metrics.spacing4};
    }
    @media(max-width: ${breakpoints.sml}){
        padding: 0 ${metrics.spacing3};
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

export const Text = styled.p`
    display: block;
    font-size: 22px;
    font-weight: 300;
    line-height: 1.2;
    color: #fff;
    margin: ${metrics.spacing3} 0 0 0;
`

export const Input = styled.input`
    width: 100%;
    padding: 16px ${metrics.spacing5};
    border-radius: 24px;
    background: ${colors.border};
    font-size: 18px;
    background: #fff;

    &, *, &::placeholder{
        color: #000;
        font-weight: 500;
    }

    @media(max-width: 768px){
        font-size: 16px;
    }
`

export const Button = styled.button<{typeButton?: "primary" | "secondary"}>`
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

    ${ ({typeButton: type}) => {
        if(type === 'secondary'){
            return `
                background: rgba(0,0,0,0);
                border: 2px solid #fff;
                color: #fff;
                &:hover{
                    background: rgba(0,0,0,0);
                }
            `
        }
    }}
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

export const Playlists = styled.ul`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;
    column-gap: ${metrics.spacing5};
    row-gap: ${metrics.spacing4};
    position: relative;
    margin: ${metrics.spacing5} 0 0 0;
    position: relative;

    & > figure{
        position: absolute;
    }

    @media(max-width: 1200px){
        grid-template-columns: repeat(4, 1fr);
    }

    @media(max-width: 991px){
        grid-template-columns: repeat(3, 1fr);
    }

    @media(max-width: 768px){
        grid-template-columns: repeat(2, 1fr);
    }

    @media(max-width: 576px){
        grid-template-columns: repeat(1, .7fr);
        justify-content: center;
    }

    @media(min-width: 1400px){
        grid-template-columns: repeat(6, 1fr);
    }
`

export const PlaylistItem = styled.li`
    height: 100%;
    width: 100%;
    position: relative;
    opacity: 0;
    animation: fadeIn 1s forwards;

    & > a,
    & > button{
        background: inherit;
        position: relative;
        cursor: pointer;

        figure{
            height: auto;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 3px 15px 10px rgba(0,0,0,0.12);
            border-radius: 12px;
            background: #353535;

            img{
                height: 100%;
                width: 100%;
                border-radius: 12px;
                object-fit: contain;
            }
        }
    }

    span{
        display: block;
        width: 100%;
        margin: ${metrics.spacing3} 0 0 0;
        font-size: 1.25rem;
        text-align: center;

        @media(max-width: 768px){
            font-size: 24;
        }

        @media(max-width: 576px){
            font-size: 26px;
        }
    }
`

export const PlaylistTable = styled.ol<{qntColumns: number, additionalCSS?: string | FlattenSimpleInterpolation}>`
    display: flex;
    flex-flow: column nowrap;
    --qntColumns: ${({qntColumns}) => qntColumns ? qntColumns : 5};
    ${({additionalCSS}) => additionalCSS}
`

const rowImageAndName = css`
    span{
        display: flex;
        flex-flow: column nowrap;

        strong{
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
        }

        small{
            color: ${colors.gray};
            font-size: 12px;
            font-weight: 500;
            margin: ${metrics.spacing1} 0 0 0;
        }
    }
` 

export const PlaylistTableRow = styled.li<{playingUri?: string, uri?: string, disabled?: boolean, viewMode?: ListTracksViewMode}>`
    display: flex;
    width: 100%;
    border-radius: ${metrics.borderRadius};

    div{
        flex-grow: 1;
        width: calc(100% / var(--qntColumns)); 
        &:nth-child(1){
            max-width: 60px;
        }
        display: inline-flex;
        align-items: center;
        padding: 10px 15px;
        text-align: left;
        vertical-align: middle;
        position: relative;

        &, & > span{
            font-size: 16px;
            color: ${colors.gray};
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        img{
            height: 40px;
            width: 40px;
            margin: 0 ${metrics.spacing3} 0 0;
        }
        // first cell
        &:nth-child(1){
            position: relative;
            justify-content: center;
            span{
                width: 100%;
                text-align: center;
                vertical-align: middle;
            }
            svg{
                height: 15px;
                width: 15px;
                fill: #fff;
                cursor: pointer;
                position: absolute;
                margin: 0 auto;
                opacity: 0;
            }
        }
        &:nth-child(1) span{
            color: ${ (props) => props.uri === props.playingUri ? colors.primary : colors.gray};
        }
        &:nth-child(2) span{
            color: ${ (props) => props.uri === props.playingUri ? colors.primary : '#fff'};
        }
        &:nth-child(1) span,
        &:nth-child(2) img{
            user-select: none;
        }

        /* @media(max-width: ${breakpoints.tbp}){
            padding-top: 0;
            padding-bottom: 0;
            margin-top: 15px;
            margin-bottom: 15px;
            &:nth-child(1){
                display: none;
            }
        } */
    }
    // thead row
    &:nth-child(1){
        div{
            text-transform: uppercase;
            font-weight: 600;

            &:nth-child(1){
                justify-content: center;
            }

            svg, svg *{
                color: ${colors.gray};
            }
        }
    }
    // tbody rows
    &:nth-child(n+2){
        transition: background .15s;

        &:hover{
            ${ ({disabled}) => !disabled ? `background: ${colors.hoverBackground};` : ''}
            
            div:nth-child(1){
                ${ ({disabled}) => !disabled ? `
                span{
                    opacity: 0;
                }
                svg{ 
                    opacity: 1;
                }` : '' }
            }
        }


        ${props => {
            if(props.viewMode === 'simplified')
                return css`
                    div:nth-child(2){
                        ${rowImageAndName}
                        span strong{
                            ${() => {
                                if(props.uri === props.playingUri)
                                    return `color: ${colors.primary};`
                                return ''
                            }}
                        }
                    }
                `
            return ''
        }}

        //disable track
        div:not(:last-child){
            ${ ({disabled}) => disabled ? `
            user-select: none;
            pointer-events: none;
            filter: blur(1px) opacity(40%);
            `:''} 
        }
    }
`

export const ArtistsTable = styled.ol<{qntColumns: number, additionalCSS?: string | FlattenSimpleInterpolation}>`
    display: flex;
    flex-flow: column nowrap;
    --qntColumns: ${({qntColumns}) => qntColumns ? qntColumns : 2};

    ${({additionalCSS}) => additionalCSS}
`

export const ArtistsTableRow = styled.li`
    display: flex;
    width: 100%;
    border-radius: ${metrics.borderRadius};

    div{
        flex-grow: 1;
        width: calc(100% / var(--qntColumns)); 
        &:nth-child(1){
            max-width: 60px;
        }
        display: inline-flex;
        align-items: center;
        padding: 10px 15px;
        text-align: left;
        vertical-align: middle;
        position: relative;
        transition: background .15s;

        &, & > span{
            font-size: 16px;
            color: ${colors.gray};
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        img{
            height: 55px;
            width: 55px;
            margin: 0 ${metrics.spacing3} 0 0;
        }
        // first cell
        &:nth-child(1){
            position: relative;
            justify-content: center;
            span{
                width: 100%;
                text-align: center;
                vertical-align: middle;
            }
            svg{
                height: 15px;
                width: 15px;
                fill: #fff;
                cursor: pointer;
                position: absolute;
                margin: 0 auto;
                opacity: 0;
            }
        }
        &:nth-child(2){
            ${rowImageAndName}
        }
    }
`