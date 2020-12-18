import React from 'react'
import styled from 'styled-components'
import {colors, metrics} from '../../../../styles/style'
import CenterButtons from './CenterButtons'
import { useSelector } from 'react-redux'
import { IStore } from '../../../../redux/store/types'
import {ICurrentState} from '../../../../redux/store/currentState/types'
import LeftButtons from './LeftButtons'
import RightButtons from './RightButtons'

const NowPlaying: React.FC = () => {
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)

    return(
        <NowPlayingWrapper>
            <NowPlayingInner>
                <LeftButtons/>
                <CenterButtons currentState={currentState}/>
                <RightButtons/>
            </NowPlayingInner>
        </NowPlayingWrapper>
    )
}

export default NowPlaying

const NowPlayingInner = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    justify-content: space-between;
    align-items: center;
    --innerPadding: ${metrics.spacing3} ${metrics.spacing4};
    --iconOpacityDisabled: .4;
    --iconOpacity: .7;
    --iconOpacityActivate: 1;
    --iconOpacityTransition: .15s;
`



const NowPlayingWrapper = styled.div`
    /* padding: ${metrics.spacing3} ${metrics.spacing4}; */
    width: 100%;
    box-shadow: 0 0px 12px -6px rgba(0,0,0,0.16);
    border-top: 1px solid ${colors.border};
    background: ${colors.darkerBackgroundTranslucent};
    backdrop-filter: ${metrics.backdropBlurFilter};
`