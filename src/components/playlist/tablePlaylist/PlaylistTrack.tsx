import React, { useContext } from 'react';
import { IPlayer, PlaylistTrack as IPlaylistTrack} from '../../../common/api/webapi/types';
import emptyPlaylistPhoto from '../../../assets/empty-playlist-photo.svg'
import {Play, Pause} from 'react-feather'
import { useSelector } from 'react-redux';
import { IStore } from '../../../redux/store/types';
import { pausePlayer, resumePlayer, playTrack } from '../../../common/api/webapi/player';
import { IToken } from '../../../redux/store/token/types'
import TrackOptions from './TrackOptions'
import { PlaylistTableRow as playlisttablerow } from '../../../styles/style';
import ContextPlaylist from '../ContextPlaylist';
import styled from 'styled-components';
import { formatAddedAt, formatDuration, toggleTrack } from '../../../common/helpers/helperPlaylistTable';


interface Icomponent{
    index: number
    track: IPlaylistTrack
    disabled: boolean
    currentState: IPlayer
    showOptions: Array<Boolean>
    handleShowOptions: Function
}

const PlaylistTrack: React.FC<Icomponent> = ({currentState,disabled,index,track,showOptions,handleShowOptions}) => {
    const {playlist} = useContext(ContextPlaylist)
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    
    const handleToggleTrack = () => {
        if(playlist){
            const uri = track.track.uri
            const contextUri = currentState.context?.uri
            const action = toggleTrack(currentState, uri)
            if(action === 'PLAY')
                playTrack({accessToken,contextUri, offset: {uri: uri}})
            else if(action === 'PAUSE')
                pausePlayer({accessToken})
            else if(action === 'RESUME')
                resumePlayer({accessToken}) 
        }
    }

    return (
        <PlaylistTableRow uri={track.track.uri} playingUri={currentState.item?.uri} disabled={disabled}>
            <div onClick={handleToggleTrack}>
                <span>{index + 1}</span>
                {
                    toggleTrack(currentState, track.track?.uri || '') === 'PAUSE'
                    ? <Pause/>
                    : <Play/>
                }
            </div>
            <div>
                <img src={track.track.album.images[0]?.url || emptyPlaylistPhoto} alt={`Album ${track.track.album.name}`}/>
                <span>{track.track.name}</span>
            </div>
            <div>
                {track.track.artists.map((artist, index: number) => `${index ? ', ' : ''}${artist.name}`)} 
            </div>
            <div>
                {track.track.album.name} 
            </div>
            <div>
                {formatAddedAt(track.added_at)}
            </div>
            <div>
                {formatDuration(track.track.duration_ms)}
            </div>
            <div>
                <TrackOptions
                    index={index}
                    track={track}
                    disabled={disabled}
                    showOptions={showOptions}
                    handleShowOptions={handleShowOptions}
                />
            </div>
        </PlaylistTableRow>
  )
}

export default PlaylistTrack

const PlaylistTableRow = styled(playlisttablerow)`
`