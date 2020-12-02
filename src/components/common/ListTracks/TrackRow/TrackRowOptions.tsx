import React, { useContext, useEffect, useRef } from 'react'
import {MoreVertical} from 'react-feather'
import styled from 'styled-components'
import { Track } from '../../../../common/api/webapi/types'
import { positionOptionsElement } from '../../../../common/helpers/helperUI'
import useTrackRowOptions from '../../../../common/hooks/components/useTrackRowOptions'
import {Dropdown as dropdown} from '../../../../styles/style'
import ContextListTracks from '../ContextListTracks'

interface TrackRowOptionsProps{
    track: Track
    index: number 
}

const TrackRowOptions: React.FC<TrackRowOptionsProps> = ({track, index}) => {
    const optionsRef = useRef<HTMLUListElement>(null)
    const {handleToggleOption, toggleOptions} = useContext(ContextListTracks)
    const {actionSaveTrack, actionRemoveSavedTrack,actionAddToPlaylist, actionAddToQueue, trackSaved} = useTrackRowOptions({track, index})

    useEffect(() => {
        if(optionsRef.current)
            positionOptionsElement(optionsRef.current)
    },[optionsRef])

    return(
        <>
            <MoreVertical onClick={() => handleToggleOption(index)}/>
            <OptionsDropdown ref={optionsRef} show={toggleOptions[index]}>
                {
                    trackSaved !== null ?
                    <>
                        {
                            trackSaved
                            ?
                            <li onClick={actionRemoveSavedTrack}>
                                <span>Remover da biblioteca</span>
                            </li>
                            :
                            <li onClick={actionSaveTrack}>
                                <span>Salvar na biblioteca</span>
                            </li>
                        }
                    </> : <></>
                 }
                <li onClick={actionAddToQueue}>
                    <span>Adicionar à fila</span>
                </li>
                <li onClick={actionAddToPlaylist}>
                    <span>Adicionar à playlist</span>
                </li>
            </OptionsDropdown>
        </>
    )
}

const OptionsDropdown = styled(dropdown)`
    top: inherit;
    left: inherit;
    right: 100%;
    bottom: inherit;
    margin: 0;
    transition: .2s opacity;

    li{
        cursor: pointer;
    }
`

export default TrackRowOptions