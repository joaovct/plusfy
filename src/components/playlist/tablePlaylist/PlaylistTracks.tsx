import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { metrics, colors, Container, Page, PlaylistTable as playlisttable, PlaylistTableRow} from '../../../styles/style';
import {Calendar, Clock} from 'react-feather'
import PlaylistTrack from './PlaylistTrack';
import { useSelector } from 'react-redux';
import { IStore } from '../../../redux/store/types';
import { ICurrentState } from '../../../redux/store/currentState/types';
import { isTrackDisabled } from '../../../common/api/disabledTracks/disabledTracks';
import { IUser } from '../../../redux/store/user/types';
import ContextPlaylist from '../ContextPlaylist';

const PlaylistTracks = () => {
    const {playlist} = useContext(ContextPlaylist)
    const [showOptions, setShowOptions] = useState<Array<Boolean>>(Array(playlist ? playlist.tracks.items.length : 0).fill(false))
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)
    const {id: userId} = useSelector<IStore, IUser>(store => store.user)

    const handleShowOptions = useCallback((index: number) =>
        setShowOptions(old => [...old.map( (_, n) => n === index ? !old[n] : false)])
    ,[setShowOptions])

    return (
        <ComponentContent>
            <Container>
                {playlist
                ?
                <PlaylistTable qntColumns={7}>
                    <PlaylistTableRow>
                        <div>#</div>
                        <div>Título</div>
                        <div>Artista</div>
                        <div>Álbum</div>
                        <div><Calendar/></div>
                        <div><Clock/></div>
                        <div></div>
                    </PlaylistTableRow>
                    {
                        playlist.tracks.items.map( (track, index) => {
                            const disabled = isTrackDisabled({userId, trackUri: track.track.uri, playlistUri: playlist.uri})
                            // const disabled = index > 0 ? true : false
                            return(
                                <PlaylistTrack
                                    key={`playlisttrack-${playlist.uri}-${track.track.uri}-${track.added_at}-${index}`}
                                    index={index}
                                    track={track}
                                    disabled={disabled}
                                    currentState={currentState}
                                    showOptions={showOptions}
                                    handleShowOptions={handleShowOptions}
                                />
                            )
                        })
                    }
                </PlaylistTable> 
                : <></>}
            </Container>
        </ComponentContent>
    )
}

export default PlaylistTracks

const PlaylistTable = styled(playlisttable)`
    ${PlaylistTableRow}{
        div{
            &:nth-child(2){
                flex-grow: 5;
            }
            &:nth-child(5){
                max-width: 165px;
            }
            &:nth-child(6){
                max-width: 75px;
            }
            &:nth-child(7){
                max-width: 55px;
                overflow: inherit;
                svg{
                    cursor: pointer;
                }
            }
        }
    }
`

const ComponentContent = styled(Page)`
    margin: ${metrics.spacing5} 0 0 0;
    background: ${colors.darkerBackground};

    @media(max-width: 576px){
        margin: ${metrics.spacing4} 0 0 0;
    }
`