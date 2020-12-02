import React, { useContext, useEffect, useRef, useState} from 'react'
import {MoreVertical} from 'react-feather'
import styled from 'styled-components'
import { PlaylistTrack } from '../../../common/api/webapi/types'
import { positionOptionsElement } from '../../../common/helpers/helperUI'
import useTrackOptionsAction from '../../../common/hooks/components/useTrackOptionsActions'
import { Dropdown } from '../../../styles/style'
import ContextPlaylist from '../ContextPlaylist'

interface ITrackOptions{
    index: number
    track: PlaylistTrack
    showOptions: Array<Boolean>
    disabled: boolean
    handleShowOptions: Function
}

const TrackOptions: React.FC<ITrackOptions> = ({index, track, disabled, handleShowOptions, showOptions}) => {
    const [isTrackSaved, setIsTrackSaved] = useState<Boolean | null>(null)
    const {playlist, savedTracks} = useContext(ContextPlaylist)
    const optionsRef = useRef<HTMLUListElement>(null)
    const {actionRemoveSavedTrack,actionSaveTrack,actionEnableTrack,actionAddToQueue,actionDisableTrack,actionAddToPlaylist,actionRemoveTrack} = useTrackOptionsAction({playlist, track: track.track, index, handleShowOptions})

    useEffect(() => optionsRef.current ? positionOptionsElement(optionsRef.current) : () => {},[optionsRef])

    useEffect(() => {
        const isIncluded = savedTracks?.items.findIndex(item => item.track.uri === track.track.uri)
        return isIncluded !== undefined
        ? isIncluded > -1
            ? setIsTrackSaved(true)
            : setIsTrackSaved(false)
        : setIsTrackSaved(null)
    },[savedTracks, track])

    return (
        <>
            <MoreVertical onClick={ () => handleShowOptions(index)} />
            <Options ref={optionsRef} show={showOptions[index]}>
                {
                isTrackSaved !== null
                ?
                <>
                    {
                    isTrackSaved
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
                {
                disabled
                ?
                <li onClick={actionEnableTrack}>
                    <span>Habilitar nessa playlist</span>
                </li> 
                : 
                <>
                    <li onClick={actionAddToQueue}>
                        <span>Adicionar à fila</span>
                    </li>
                    <li onClick={actionDisableTrack}>
                        <span>Desabilitar nessa playlist</span>
                    </li>
                </>
                }
                <li onClick={actionAddToPlaylist}>
                    <span>Adicionar à playlist</span>
                </li>
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