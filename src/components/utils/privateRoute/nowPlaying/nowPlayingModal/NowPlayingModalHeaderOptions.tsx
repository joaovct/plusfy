import React, { useState } from 'react'
import styled from 'styled-components'
import { MoreVertical } from 'react-feather'
import { Track } from '../../../../../common/api/webapi/types'
import { Dropdown } from '../../../../../styles/style'
import useTrackRowOptions from '../../../../../common/hooks/components/listTracks/useTrackRowOptions'

interface Props{
    track: Track
}

const NowPlayingModalHeaderOptions: React.FC<Props> = ({track}) => {
    const [showOptions, setShowOptions] = useState(false)
    const {actionAddToPlaylist, actionAddToQueue} = useTrackRowOptions({track, index: 0, isContextAvailable: false, callbackContextUnavailable: () => setShowOptions(false)})

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
            </Dropdown>
        </WrapperDropdown>
    )
}

export default NowPlayingModalHeaderOptions

const WrapperDropdown = styled.div`
    position: relative; 

    svg{
        height: 25px;
        width: 25px;
        cursor: pointer
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