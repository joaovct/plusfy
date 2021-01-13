import React, { useRef } from 'react'
import { ThumbnailTrack as ThumbnailTrackType} from '../../../common/hooks/components/mood/landing/types'
import styled from 'styled-components'
import { colors, breakpoints, metrics } from '../../../styles/style'

const ThumbnailTrack: React.FC<ThumbnailTrackType> = ({name, imgSrc}) => {
    const figureRef = useRef<HTMLDivElement>(null)

    return (
        <ThumbnailStyled
            ref={figureRef}
            width={figureRef.current?.clientWidth}
            imgSrc={imgSrc} title={name}
        >
            <img src={imgSrc} alt={name}/>
        </ThumbnailStyled>
    )
}

const ThumbnailStyled = styled.figure<{imgSrc: string, width?: number}>`
    height: 100%;
    width: 100%;
    background: ${colors.darkerBackground};
    position: relative;

    &::before{
        content: "";
        padding-bottom: 100%;
        display: block;
    }

    img{
        height: 100%;
        width: 100%;
        max-height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
        transition: .5s opacity;
        opacity: 0;

        ${({imgSrc}) => {
            if(imgSrc){
                return `
                    opacity: 1;
                `
            }
        }}
    }

    @media(max-width: ${breakpoints.tbp}){
        width: 100%;
        height: 100%;
        grid-row: 1;

        &:nth-child(1){
            grid-column: 1 / 4;
        }
        &:nth-child(2){
            grid-column: 2 / 5;
        }
        &:nth-child(3){
            grid-column: 3 / 6;
        }
        &:nth-child(4){
            grid-column: 4 / 7;
        }
        &:nth-child(5){
            grid-column: 5 / 8;
        }
        &:nth-child(6){
            grid-column: 6 / 9;
        }

        &, img{
            border-radius: ${metrics.borderRadius};
        }
    }

    @media(max-width: 380px){
        &:nth-child(n+4){
            display: none;
        }

        &:nth-child(1){
            grid-column: 1 / 3;
        }
        &:nth-child(2){
            grid-column: 2 / 4;
        }
        &:nth-child(3){
            grid-column: 3 / 5;
        }
    }
`

export default ThumbnailTrack