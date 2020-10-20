import React, {useCallback, useEffect, useRef} from 'react'
import {MoreVertical} from 'react-feather'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { saveToLibrary } from '../../api/webapi/library'
import { addToQueue } from '../../api/webapi/player'
import { IPlaylistTrack } from '../../api/webapi/types'
import { positionOptionsElement } from '../../helpers/HelperUI'
import useDisabledTracks from '../../hooks/useDisabledTracks'
import { IToken } from '../../store/token/types'
import { IStore } from '../../store/types'
import { Dropdown } from '../../styles/style'
import { IPlaylistChildComponent } from './types'

interface ITrackOptions extends IPlaylistChildComponent{
    index: number
    playlistTrack: IPlaylistTrack
    showOptions: Array<Boolean>
    isDisabled: boolean
    handleShowOptions: Function
}

const TrackOptions: React.FC<ITrackOptions> = ({showOptions, handleShowOptions, index, playlist, playlistTrack, isDisabled}) => {
    const optionsRef = useRef<HTMLUListElement>(null)
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const action = useDisabledTracks()

    useEffect(() => optionsRef.current ? positionOptionsElement(optionsRef.current) : () => {},[optionsRef])
    
    const handleSaveToLibrary = useCallback(() => {
        if(accessToken){
            saveToLibrary({accessToken, ids: [playlistTrack.track.id]})
            handleShowOptions(index)
        }
    },[accessToken, playlistTrack, handleShowOptions, index])

    const handleAddToQueue = useCallback(() => {
        if(accessToken){
            handleShowOptions(index)
            addToQueue({accessToken, uri: playlistTrack.track.uri})
        }
    },[accessToken, playlistTrack, handleShowOptions, index])

    const handleEnableTrack = useCallback(() => {
        handleShowOptions(index)
        setTimeout(() => action({action: 'delete', playlistUri: playlist.uri, uri: playlistTrack.track.uri}) ,250)
    },[action, playlist, playlistTrack, handleShowOptions, index])

    const handleDisableTrack = useCallback(() => {
        handleShowOptions(index)
        setTimeout(() => action({action: 'set', playlistUri: playlist.uri, uri: playlistTrack.track.uri}) ,250)
    },[action, playlist, playlistTrack, handleShowOptions, index])

    return (
        <>
            <MoreVertical onClick={ () => handleShowOptions(index)} />
            <Options ref={optionsRef} show={showOptions[index]}>
                <li onClick={handleSaveToLibrary}>
                    <span>Salvar na biblioteca</span>
                </li>
                {
                isDisabled
                ?
                <li onClick={handleEnableTrack}>
                    <span>Habilitar nessa playlist</span>
                </li> 
                : 
                <>
                    <li onClick={handleAddToQueue}>
                        <span>Adicionar a fila</span>
                    </li>
                    <li onClick={handleDisableTrack}>
                        <span>Desabilitar nessa playlist</span>
                    </li>
                </>
                }
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