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

export const PlaylistTable = styled.ol<{qntColumns: number}>`
    display: flex;
    flex-flow: column nowrap;
    --qntColumns: ${({qntColumns}) => qntColumns ? qntColumns : 5};
`

export const PlaylistTableRow = styled.li<{playingUri?: string, uri?: string, disabled?: boolean}>`
    display: flex;
    width: 100%;
    border-radius: ${metrics.borderRadius};

    div{
        flex-grow: 1;
        width: calc(100% / var(--qntColumns)); 
        &:first-child{
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
        &:first-child{
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
        &:first-child span,
        &:nth-child(2) span{
            color: ${ (props) => props.uri === props.playingUri ? colors.primary : '#fff'};
        }
        &:first-child span,
        &:nth-child(2) img{
            user-select: none;
        }
    }
    // thead row
    &:first-child{
        div{
            text-transform: uppercase;
            font-weight: 600;

            &:first-child{
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
            ${ ({disabled}) => !disabled ? `background: ${colors.background};` : ''}

            div:first-child{
                ${ ({disabled}) => !disabled ? `
                span{
                    opacity: 0;
                }
                svg{ 
                    opacity: 1;
                }` : '' }
            }
        }

        //disable track
        div:not(:last-child){
            ${ ({disabled}) => disabled ? `
            opacity: .4;
            user-select: none;
            pointer-events: none;
            `:''} 
        }
    }
`


// export const TablePlaylist = styled.table`
//     width: 100%;
//     table-layout: fixed;
    
//     thead tr th,
//     tbody tr td{
//         font-size: 16px;
//         text-align: left;
//         vertical-align: middle;
//         padding: 10px 15px;
//         color: ${colors.gray};

//         &:first-child{
//             --width-first-child: 60px;
//             width: var(--width-first-child);
//             font-weight: 500;
//             text-align: center;
//         }
//         &:nth-child(5){
//             width: 157px;
//         }
//         &:nth-child(6){
//             width: 70px;
//         }
//         &:nth-child(7){
//             width: 50px;
//         }

//         @media(max-width: 991px){
//             &:nth-child(5){
//                 display: none;
//             }
//         }
//         @media(max-width: 768px){
//             &:nth-child(6){
//                 display: none;
//             }
//         }
//         @media(max-width: 576px){
//             &:nth-child(4){
//                 display: none;
//             }
//         }
//     }

//     thead tr th{
//         font-weight: 600;
//         text-transform: uppercase;

//         svg{
//             stroke: ${colors.gray};
//         }
//     }
    
//     tbody tr td{
//         overflow: hidden;
//         white-space: nowrap;
//         text-overflow: ellipsis;

//         &:nth-of-type(2){
//             width: 100%;
//             display: flex;
//             align-items: center;

//             img{
//                 height: 38px;
//                 width: 38px;
//                 object-fit: contain;
//                 margin: 0 ${metrics.spacing3} 0 0;
//             }
//         }
//     }
// `

// export const TablePlaylistRow = styled.tr<{isPlaying: boolean}>`
//     td{
//         transition: opacity .25s;
//     }

//     td:first-child{
//         position: relative;

//         span{
//             width: 100%;
//             display: inline-block;
//         }

//         svg{
//             --size-icon-play: 18px;
//             cursor: pointer;
//             opacity: 0;
//             height: var(--size-icon-play);
//             width: var(--size-icon-play);
//             position: absolute;
//             margin: 0 auto;
//             left: calc( var(--width-first-child) / 2 - var(--size-icon-play) / 2 ) ;
//             fill: #fff;
//         }
//     }

//     td:first-child span,
//     td:nth-child(2){
//         color: ${({isPlaying: thisIsPlaying}) => thisIsPlaying ? `${colors.primary}` : '#fff'};
//         transition: color .25s;
//     }

//     td:last-child{
//         overflow: visible;
//         position: relative;

//         svg{
//             cursor: pointer;
//         }
//     }
// `