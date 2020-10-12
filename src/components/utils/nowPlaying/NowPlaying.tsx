import React from 'react'
import styled from 'styled-components'
import useGetCurrentState from '../../../hooks/useGetCurrentState'
import { colors, metrics } from '../../../styles/style'
import emptyTrackPhoto from '../../../assets/empty-playlist-photo.svg'
import CenterButtons from './CenterButtons'

const NowPlaying: React.FC = () => {
    const currentState = useGetCurrentState()

    return <>
        {
            currentState.item ?
            <NowPlayingWrapper>
                <NowPlayingInner>
                    <Left>
                        <LeftTrackImg>
                            <img src={currentState.item.album.images[0].url || emptyTrackPhoto} alt="Track album"/>
                        </LeftTrackImg>
                        <LeftTrackInfo>
                            <p>{currentState.item.name}</p>
                            <span>{currentState.item.artists.map((item, i) => {
                                return `${i > 0 ? ', ' : ''} ${item.name}`
                            })}</span>
                        </LeftTrackInfo>
                    </Left>
                    <Center>
                        <CenterButtons currentState={currentState}/>
                    </Center>
                    <Right/>
                </NowPlayingInner>
            </NowPlayingWrapper>
            : <></>
        }
    </>
}

export default NowPlaying

const Right = styled.div`
    flex: 1;
`
const Center = styled.div`
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
`

const LeftTrackInfo = styled.div`
    p{
        font-size: 14px;
    }

    span{
        font-size: 11px;
        color: ${colors.gray};
    }

    p, span{
        &:hover{
            cursor: pointer;
            text-decoration: underline;
        }
    }
`

const LeftTrackImg = styled.figure`
    height: 55px;
    width: 55px;
    margin: 0 ${metrics.spacing3} 0 0;

    img{
        height: 100%;
        width: 100%;
    }
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const NowPlayingInner = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const NowPlayingWrapper = styled.div`
    width: 100%;
    position: sticky;
    bottom: 0;
    left: 0;
    padding: ${metrics.spacing3} ${metrics.spacing4};
    box-shadow: ${metrics.boxShadowInverse};
    background: ${colors.darkerBackground};
`