import React, { useState } from 'react'
import styled from 'styled-components'
import { MoreVertical } from 'react-feather'
import { Track } from '../../../../common/api/webapi/types'
import { Dropdown } from '../../../../styles/style'
import useTrackRowOptions from '../../../../common/hooks/components/listTracks/useTrackRowOptions'

interface Props{
    track: Track
    closeModal: () => void
}

const NowPlayingModalHeaderOptions: React.FC<Props> = ({track, closeModal}) => {
    const [showOptions, setShowOptions] = useState(false)
    const {actionAddToPlaylist, actionAddToQueue, actionTrackRecommendation} = useTrackRowOptions({track, index: 0, isContextAvailable: false, callbackContextUnavailable: () => setShowOptions(false)})

    const handleActionTrackRecommendation = () => {
        setShowOptions(state => !state)
        closeModal()
        actionTrackRecommendation()
    }

    return(
        <WrapperDropdown>
            <button onClick={() => setShowOptions(state => !state)}>
                <MoreVertical/>
            </button>
            <Dropdown show={showOptions}>
                <li onClick={actionAddToQueue}>
                    <span>Adicionar à fila</span>
                </li>
                <li onClick={actionAddToPlaylist}>
                    <span>Adicionar à playlist</span>
                </li>
                <li onClick={handleActionTrackRecommendation}>
                    <span>Recomendações</span>
                </li>
            </Dropdown>
        </WrapperDropdown>
    )
}

export default NowPlayingModalHeaderOptions

const WrapperDropdown = styled.div`
    grid-area: "options";
    position: relative; 

    svg{
        height: var(--sizeOptionsButton);
        width: var(--sizeOptionsButton);
        cursor: pointer;
        stroke-width: 1.5px;
    }

    ${Dropdown}{
        top: inherit;
        left: inherit;
        bottom: inherit;
        right: 0;
        width: 200px;
        max-width: calc(100vw - var(--sideSpacingModal) - var(--sideSpacingModal));

        li span{
            cursor: pointer;
        }
    }
`