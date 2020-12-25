import React, { useState } from 'react'
import styled from 'styled-components'
import {breakpoints, colors, metrics} from '../../../../styles/style'
import CenterButtons from './CenterButtons'
import LeftButtons from './LeftButtons'
import NowPlayingModal from './NowPlayingModal'
import RightButtons from './RightButtons'
import { HandleSetToggleModal } from './types'

const NowPlaying: React.FC = () => {
    const [toggleModal, setToggleModal] = useState(false)
    
    const handleSetToggleModal: HandleSetToggleModal = (state) => {
        setToggleModal(state)
    }

    return(
        <>
            <NowPlayingWrapper>
                <NowPlayingInner>
                    <LeftButtons handleSetToggleModal={handleSetToggleModal}/>
                    <CenterButtons/>
                    <RightButtons/>
                </NowPlayingInner>
            </NowPlayingWrapper>
            <NowPlayingModal
                toggleModal={toggleModal}
                handleSetToggleModal={handleSetToggleModal}
            />
        </>
    )
}

export default NowPlaying

const NowPlayingInner = styled.div`
    height: 100%;
    width: 100%;
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    justify-content: space-between;
    align-items: center;
    --innerPaddingVertical: ${metrics.spacing3};
    --innerPaddingHorizontal: ${metrics.spacing4};
    --innerPadding: var(--innerPaddingVertical) var(--innerPaddingHorizontal);
    --iconOpacityDisabled: .4;
    --iconOpacity: .7;
    --iconOpacityActivate: 1;
    --iconOpacityTransition: .15s;

    @media(max-width: ${breakpoints.lg}){
        --innerPaddingHorizontal: ${metrics.spacing3};
    }

    @media(max-width: ${breakpoints.tbl}){
        --innerPaddingHorizontal: ${metrics.spacing2};
    }

    @media(max-width: ${breakpoints.tbp}){
        --iconOpacity: 1;
        --innerPaddingVertical: 0;
        grid-template-columns: 1fr auto;
    }
`

const NowPlayingWrapper = styled.div`
    /* padding: ${metrics.spacing3} ${metrics.spacing4}; */
    width: 100%;
    box-shadow: 0 0px 12px -6px rgba(0,0,0,0.16);
    border-top: 1px solid ${colors.border};
    background: ${colors.darkerBackgroundTranslucent};
    backdrop-filter: ${metrics.backdropBlurFilter};
`