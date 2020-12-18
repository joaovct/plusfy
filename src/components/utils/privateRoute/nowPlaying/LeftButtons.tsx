import React from 'react'
import styled from 'styled-components'
import { colors, metrics } from '../../../../styles/style'
import { useSelector } from 'react-redux'
import { IStore } from '../../../../redux/store/types'
import { ICurrentState } from '../../../../redux/store/currentState/types'
import { formatArtistName, formatTrackPhoto } from '../../../../common/helpers/helperPlaylistTable'

const LeftButtons = () => {
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)

    return(
        <Left>
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
        width: 100%;
        display: table;
        table-layout: fixed;

        strong{
            font-size: 14px;
            font-weight: 400;
        }

        small{
            font-size: 11px;
            color: ${colors.gray};
        }

        strong,small{
            display: table-cell;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;

            &:hover{
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }
`

const LeftTrackImg = styled.figure`
    min-height: 55px;
    min-width: 55px;
    max-height: 55px;
    max-width: 55px;
    margin: 0 ${metrics.spacing3} 0 0;

    img{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
`

const Left = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    padding: var(--innerPadding);
`