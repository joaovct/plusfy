import React from 'react'
import styled from 'styled-components'
import { breakpoints, colors, metrics } from '../../../styles/style'
import { useSelector } from 'react-redux'
import { IStore } from '../../../redux/store/types'
import { ICurrentState } from '../../../redux/store/currentState/types'
import { formatArtistName, formatTrackPhoto } from '../../../common/helpers/helperPlaylist'
import { HandleSetToggleModal } from './types'
import { nowPlayingMobileBreakpoint } from './style'

interface Props{
    handleSetToggleModal: HandleSetToggleModal
}

const LeftButtons: React.FC<Props> = ({handleSetToggleModal}) => {
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)

    return(
        <Left onClick={() => handleSetToggleModal(true)}>
            <LeftTrackImg>
                <img src={formatTrackPhoto(currentState.item)} alt="Track playing"/>
            </LeftTrackImg>
            <LeftTrackInfo>
                <span>
                    <strong>{currentState?.item?.name}</strong>
                </span>
                <span>
                    <small>{currentState?.item ? formatArtistName(currentState?.item) : ''}</small>
                </span>
            </LeftTrackInfo>
        </Left>
    )
}

export default LeftButtons

const LeftTrackInfo = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;

    span{
        padding: 2.5px 0;
        width: 100%;
        display: table;
        table-layout: fixed;

        strong{
            font-size: 14px;
            font-weight: 500;
        }

        small{
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 2;
            color: ${colors.gray};
        }

        strong, small{
            display: table-cell;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;

            &:hover{
                cursor: pointer;
                @media(min-width: ${nowPlayingMobileBreakpoint}){
                    text-decoration: underline;
                }
            }
        }

        @media(max-width: ${nowPlayingMobileBreakpoint}){
            pointer-events: none;
            -webkit-user-select: none;
            user-select: none;
        }

        @media(max-width: ${breakpoints.sml}){
            padding: 1px 0;
        }

        @media(max-width: ${breakpoints.smp}){
            strong{
                font-size: 12px;
            }
            small{
                font-size: 10px;
            }
        }
    }
`

const LeftTrackImg = styled.figure`
    --sizeThumbnail: 60px;
    min-height: var(--sizeThumbnail);
    min-width: var(--sizeThumbnail);
    max-height: var(--sizeThumbnail);
    max-width: var(--sizeThumbnail);
    margin: 0 ${metrics.spacing3} 0 0;

    img{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    @media(max-width: ${breakpoints.tbl}){
        margin: 0 ${metrics.spacing2} 0 0;
    }

    @media(max-width: ${nowPlayingMobileBreakpoint}){
        --sizeThumbnail: 60px;
        margin: 0 ${metrics.spacing3} 0 0;
    }

    @media(max-width: ${breakpoints.sml}){
        margin: 0 ${metrics.spacing2} 0 0;
    }

    @media(max-width: ${breakpoints.smp}){
        --sizeThumbnail: 55px;
    }
`

const Left = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    padding: var(--innerPadding);

    @media(max-width: ${nowPlayingMobileBreakpoint}){
        padding-left: 0;
        padding-right: 0;
    }
`