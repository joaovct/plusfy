import styled, { FlattenSimpleInterpolation, css, FlattenInterpolation, ThemedStyledProps } from 'styled-components'
import {ListTracksViewMode} from '../components/common/listTracks/types'
import * as colors from './colors'
import * as metrics from './metrics'
import * as breakpoints from './breakpoints'
import GlobalStyles from './GlobalStyles'

export {colors,metrics,breakpoints,GlobalStyles}

export const PrivateRouteComponent = styled.div`
    min-height: 100%;
    display: flex;
    flex-flow: column nowrap;
`

export const Page = styled.section`
    flex: 1;
    width: 100%;
    padding: ${metrics.spacing3} var(--spacingSidesPage); 
    color: #fff;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
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

    @media(max-width: ${breakpoints.tbl}){
        font-size: 35px;
    }
    @media(max-width: ${breakpoints.tbp}){
        font-size: 30px;
    }
    @media(max-width: ${breakpoints.sml}){
        font-size: 28px;
    }
    @media(max-width: ${breakpoints.smp}){
        font-size: 24px;
    }
`

export const Text = styled.p`
    display: block;
    font-size: 20px;
    font-weight: 300;
    line-height: 1.2;
    color: #fff;
    margin: ${metrics.spacing3} 0 0 0;

    @media(max-width: ${breakpoints.tbp}){
        font-size: 20px;
    }
    @media(max-width: ${breakpoints.sml}){
        font-size: 18px;
    }
`

export const SeeMore = styled(Text)`
    display: flex;
    justify-content: center;
    margin: ${metrics.spacing3} 0 0 0;

    a, span{
        text-align: center;
        font-size: 1rem;
        font-weight: 500;
        text-transform: uppercase;
        color: ${colors.gray};
        cursor: pointer;
        transition: color .25s;
        text-decoration: underline;

        &:hover{
            color: ${colors.secondary};
        }
    }
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

    @media(max-width: ${breakpoints.tbl}){
        font-size: 16px;
    }
    @media(max-width: ${breakpoints.tbp}){
        font-size: 14px;
        padding: 12px ${metrics.spacing4};
    }
`

export const FieldsetSelect = styled.div`
    position: relative;
    border: 1px solid ${colors.border};
    border-radius: 24px;
    --sizeArrow: 28px;
    --spacingArrow: 4px;
    --rightArrowBorder: calc(var(--sizeArrow) + var(--spacingArrow) * 2);

    &:after,
    &:before{
        content: '';
        display: block;
        position: absolute;
        user-select: none;
        pointer-events: none;
    }

    &:after{
        width: 1px;
        height: 100%;
        background: ${colors.border};
        top: 0;
        right: var(--rightArrowBorder);
    }

    &:before{
        content: 'expand_more';
        top: 50%;
        right: var(--spacingArrow);
        margin-top: calc(var(--sizeArrow) / -2);
        font-family: 'Material Icons';
        font-size: var(--sizeArrow);
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        -moz-osx-font-smoothing: grayscale;
        font-feature-settings: 'liga';
    }

    select{
        display: inline-block;
        font-size: 1rem;
        padding: 4px calc(var(--rightArrowBorder) + var(--spacingArrow) * 2) 4px 12px;
        background-color: transparent;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        text-align: center;

        option{
            background: ${colors.darkerBackgroundTranslucent};
        }
    }
`

export const InputRange = styled.input.attrs({type: 'range'})`
    transition: opacity .25s;

    &:disabled{
        opacity: var(--opacityInputDisabled);
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

    @media(max-width: ${breakpoints.sml}){
        min-width: inherit;
        font-size: 13px;
        padding: 12px 30px;
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

    @media(max-width: ${breakpoints.tbl}){
        height: 60px;
    }

    @media(max-width: ${breakpoints.tbp}){
        height: 55px;
    }
`

export const Dropdown = styled.ul<{show: Boolean}>`
    border-radius: 14px;
    margin: 10px 0 0 0;
    box-shadow: ${metrics.boxShadow};
    transition: .5s opacity;
    opacity: 0;
    pointer-events: none;
    user-select: none;
    position: absolute;
    z-index: var(--zIndexOverlay);
    min-width: 175px;
    top: 0;
    left: 0;
    border: 1px solid ${colors.darkerBackground};
    background: ${colors.backgroundTranslucent};
    backdrop-filter: ${metrics.backdropBlurFilter};

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

export const ListPlaylistsStyled = styled.ul`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-template-rows: auto;
    column-gap: ${metrics.spacing5};
    row-gap: ${metrics.spacing4};
    position: relative;
    position: relative;

    & > figure{
        position: absolute;
    }
    @media(max-width: 1200px){
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    @media(max-width: 991px){
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @media(max-width: 768px){
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media(max-width: ${breakpoints.tbp}){
        grid-template-columns: 100%;
        justify-content: center;
        column-gap: 0;
        row-gap: 20px;
    }
`

export const ListPlaylistsItemStyled = styled.li`
    height: 100%;
    width: 100%;
    position: relative;
    opacity: 0;
    animation: fadeIn 1s forwards;
    display: flex;
    flex-flow: column nowrap;

    @keyframes fadeIn{
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }

    & > a,
    & > div{
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
        flex: 1 1 auto;
        display: flex;
        flex-flow: column nowrap;
        width: 100%;
        margin: ${metrics.spacing3} 0 0 0;

        a, div{
            background: inherit;
            flex: 1 1 auto;
            text-align: center;
            strong{
                --lineHeight: 1.2em;
                --numberLines: 3;
                line-height: var(--lineHeight);
                max-height: calc( var(--lineHeight) * var(--numberLines) );
                display: -webkit-box;
                -webkit-line-clamp: var(--numberLines);
                -webkit-box-orient: vertical;  
                overflow: hidden;
                font-size: 1.25rem;
                font-weight: 600;
                text-align: center;
                color: #fff;
                overflow: hidden;
            }
        }

        small{
            font-size: 14px;
            text-align: center;
            color: ${colors.gray};
            margin: ${metrics.spacing2} 0 0 0;
        }
    }

    @media(max-width: ${breakpoints.tbp}){
        flex-flow: row nowrap;
        align-items: center;

        & > a,
        & > div{
            margin: 0 ${metrics.spacing3} 0 0;

            figure{
                height: 60px;
                width: 60px;
                user-select: none;
                object-fit: cover;

                @media(max-width: ${breakpoints.sml}){
                    height: 55px;
                    width: 55px;
                }

                img{
                    border-radius: 0;
                }
            }
        }

        span{
            flex: 1 1 auto;
            width: 100%;
            display: flex;
            justify-content: center;
            margin: 0;
            cursor: pointer;
            
            a, div{
                max-width: 100%;
                width: 100%;
                display: table;
                table-layout: fixed;

                strong{
                    font-size: 16px;
                    text-align: left;
                    display: table-cell;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }

            small{
                display: block;
                font-size: 12px;
                margin: 3px 0 0 0;
                text-align: left;
            }
        }
    }
`

export interface PlaylistTableProps{
    qntColumns: number
    additionalCSS?: string | FlattenSimpleInterpolation | FlattenInterpolation<ThemedStyledProps<any, any>>
    showHeader?: boolean
}

export const PlaylistTable = styled.ol<PlaylistTableProps>`
    display: flex;
    flex-flow: column nowrap;
    --qntColumns: ${({qntColumns}) => qntColumns ? qntColumns : 4};
    ${({additionalCSS}) => additionalCSS}

    ${({showHeader}) => {
        if(showHeader === false)
            return `
                ${PlaylistTableRow}:nth-child(1){
                    display: none;
                }
            `
        return ''
    }}
`

export interface PlaylistTableRowProps{
    playingUri?: string
    uri?: string
    disabled?: boolean
    viewMode?: ListTracksViewMode
}

export const PlaylistTableRow = styled.li<PlaylistTableRowProps>`
    display: flex;
    width: 100%;
    border-radius: ${metrics.borderRadius};

    div{
        flex-grow: 1;
        width: calc(100% / var(--qntColumns)); 
        display: inline-flex;
        align-items: center;
        padding: 10px 15px;
        text-align: left;
        vertical-align: middle;
        position: relative;
        --sizeMoreOptionsIcon: 24px;
        

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
            user-select: none;
            object-fit: cover;
        }
        // first cell
        &:nth-child(1){
            max-width: 60px;
            position: relative;
            justify-content: center;
            span{
                width: 100%;
                text-align: center;
                vertical-align: middle;
                color: ${ (props) => props.uri === props.playingUri && !props.disabled ? colors.primary : colors.gray};
                user-select: none;
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
            flex-grow: 5;
            span{
                strong{
                    color: #fff;
                }

                ${props => {
                    if(!props.disabled && props.uri === props.playingUri)
                        return `
                            /* increase selector */
                            &:nth-child(n+1) strong:nth-child(n+1){
                                color: ${colors.primary};
                            }
                        `
                }}
            }
        }

        &:nth-last-child(2){
            max-width: 75px;
        }
        &:last-child{
            display: inline-flex;
            max-width: 55px;
            overflow: inherit;
            svg{
                height: var(--sizeMoreOptionsIcon);
                width: var(--sizeMoreOptionsIcon);
                cursor: pointer;
            }
        }

        ${({viewMode}) => {
            if(viewMode === 'simplified')
                return css`
                    display: none;
                    &:nth-child(1),
                    &:nth-child(2),
                    &:last-child{
                        display: inline-flex;
                    }

                    &:nth-child(1){
                        padding-left: 0;
                        max-width: 40px;
                    }
                    &:nth-child(2){
                        cursor: pointer;
                    }
                    &:last-child{
                        padding-left: 0;
                        padding-right: 0;
                        max-width: var(--sizeMoreOptionsIcon); 
                    }
                `
            return ''
        }}

        @media(max-width: ${breakpoints.lg}){
            &:nth-child(2){
                flex-grow: 3;
            }
        }
        @media(max-width: ${breakpoints.tbl}){
            &:nth-child(3){
                display: none;
            }
        }
        @media(max-width: ${breakpoints.tbp}){
            &:nth-child(2){
                cursor: pointer;
            }
            &:nth-last-child(2){
                display: none;
            }
        }
        @media(max-width: ${breakpoints.sml}){
            padding-top: 10px;
            padding-bottom: 10px;
            &:nth-child(1){
                display: none;
            }
            &:nth-child(2){
                padding-left: 0;
                
                img{
                    height: 40px;
                    width: 40px;
                }
            }
            &:last-child{
                padding-left: 0;
                padding-right: 0;
                max-width: var(--sizeMoreOptionsIcon);
            }
        }
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

        @media(min-width: calc(${breakpoints.tbp} + 1px)){
            &:hover{
                ${ ({disabled}) => !disabled ? `background: ${colors.hoverBackground};` : ''}
                div:nth-child(1){
                    ${({disabled}) => {
                        if(!disabled)
                            return css`
                                span{
                                    opacity: 0;
                                }
                                svg{ 
                                    opacity: 1;
                                }
                            `
                        return ''
                    }}
                }
            }
        }

        div{
            &:nth-child(2){
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

                    ${(props) => {
                        if(props.uri === props.playingUri)
                            return `color: ${colors.primary};`
                        return ''
                    }}
                }
            }
            &:not(:last-child){
                transition: filter .25s;
                ${ ({disabled}) => disabled ? `
                user-select: none;
                pointer-events: none;
                filter: blur(1px) opacity(40%);
                `:''} 
            }
        }

        //disable track
        div:not(:last-child){
            ${({disabled}) => {
                if(disabled)
                    return css`
                        user-select: none;
                        pointer-events: none;
                        filter: blur(1px) opacity(40%);
                    `
                return ''
            }}
        }
    }

    @media(max-width: ${breakpoints.sml}){
        &:nth-child(1){
            display: none;
        }
        &:last-child{
            padding-bottom: 10px;
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
            object-fit: cover;

            @media(max-width: ${breakpoints.sml}){
                height: 45px;
                width: 45px;
            }
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
        }
        @media(max-width: ${breakpoints.tbp}){
            &:nth-child(1){
                display: none;
            }
            &:nth-child(2){
                padding-left: 0;
                padding-right: 0;
            }
        }
    }
`