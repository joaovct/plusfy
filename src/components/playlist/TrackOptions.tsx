import React, {useEffect, useRef} from 'react'
import {MoreVertical} from 'react-feather'
import styled from 'styled-components'
import { IPlaylistTrack } from '../../api/webapi/types'
import { positionOptionsElement } from '../../helpers/HelperUI'
import useTrackOptionsAction from '../../hooks/useTrackOptionsActions'
import { Dropdown } from '../../styles/style'
import { IPlaylistChildComponent } from './types'

interface ITrackOptions extends IPlaylistChildComponent{
    index: number
    playlistTrack: IPlaylistTrack
    showOptions: Array<Boolean>
    isDisabled: boolean
    handleShowOptions: Function
}

const TrackOptions: React.FC<ITrackOptions> = ({
    index, playlist, playlistTrack, isDisabled, handleShowOptions, showOptions
}) => {
    const optionsRef = useRef<HTMLUListElement>(null)
    const {actionSaveToLibrary, actionRemoveTrack, actionAddToQueue, actionDisableTrack, actionEnableTrack} = useTrackOptionsAction({playlist, track: playlistTrack.track, index, handleShowOptions})

    useEffect(() => optionsRef.current ? positionOptionsElement(optionsRef.current) : () => {},[optionsRef])

    return (
        <>
            <MoreVertical onClick={ () => handleShowOptions(index)} />
            <Options ref={optionsRef} show={showOptions[index]}>
                <li onClick={actionSaveToLibrary}>
                    <span>Salvar na biblioteca</span>
                </li>
                {
                isDisabled
                ?
                <li onClick={actionEnableTrack}>
                    <span>Habilitar nessa playlist</span>
                </li> 
                : 
                <>
                    <li onClick={actionAddToQueue}>
                        <span>Adicionar a fila</span>
                    </li>
                    <li onClick={actionDisableTrack}>
                        <span>Desabilitar nessa playlist</span>
                    </li>
                </>
                }
                <li onClick={actionRemoveTrack}>
                    <span>Remover dessa playlist</span>
                </li>
            </Options>
        </>
    )
}

export default TrackOptions

const Options = styled(Dropdown)`
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