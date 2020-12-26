import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { ICurrentState } from '../../../../redux/store/currentState/types'
import { IStore } from '../../../../redux/store/types'
import {breakpoints, colors, metrics} from '../../../../styles/style'
import CenterButtons from './CenterButtons'
import LeftButtons from './LeftButtons'
import NowPlayingModal from './NowPlayingModal'
import RightButtons from './RightButtons'
import { cssVariables } from './style'
import { HandleSetToggleModal } from './types'

const NowPlaying: React.FC = () => {
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState) 
    const [toggleModal, setToggleModal] = useState(false)
    
    const handleSetToggleModal: HandleSetToggleModal = (state) => {
        if(currentState.item?.uri)
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
    ${cssVariables}

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
    width: 100%;
    box-shadow: 0 0px 12px -6px rgba(0,0,0,0.16);
    border-top: 1px solid ${colors.border};
    background: ${colors.darkerBackgroundTranslucent};
    backdrop-filter: ${metrics.backdropBlurFilter};
`