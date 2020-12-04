import React, { useContext, memo } from 'react';
import { PlaylistTrack as IPlaylistTrack} from '../../../common/api/webapi/types';
import emptyPlaylistPhoto from '../../../assets/empty-playlist-photo.svg'
import {Play, Pause} from 'react-feather'
import { useSelector } from 'react-redux';
import { IStore } from '../../../redux/store/types';
import { pausePlayer, resumePlayer, playTrack } from '../../../common/api/webapi/player';
import { IToken } from '../../../redux/store/token/types'
import TrackOptions from './TrackOptions'
import { PlaylistTableRow } from '../../../styles/style';
import ContextPlaylist from '../ContextPlaylist';
import { formatAddedAt, formatDuration, ToggleTrackAction } from '../../../common/helpers/helperPlaylistTable';

interface PlaylistTrackProps{
    index: number
    track: IPlaylistTrack
    disabled: boolean
    showOptions: Array<boolean>
    handleShowOptions: Function
    toggleTrackAction: ToggleTrackAction
    playingURI: string
}

const PlaylistTrack: React.FC<PlaylistTrackProps> = memo((props) => {
    const {playlist} = useContext(ContextPlaylist)
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    
    const handleToggleTrack = () => {
        if(playlist){
            const uri = props.track.track.uri
            const contextUri = playlist.uri

            if(props.toggleTrackAction === 'PLAY')
                playTrack({accessToken, contextUri, offset: {uri: uri}})
            else if(props.toggleTrackAction === 'PAUSE')
                pausePlayer({accessToken})
            else if(props.toggleTrackAction === 'RESUME')
                resumePlayer({accessToken}) 
        }
    }

    return (
        <PlaylistTableRow uri={props.track.track.uri} playingUri={props.playingURI} disabled={props.disabled}>
            <div onClick={handleToggleTrack}>
                <span>{props.index + 1}</span>
                {
                    props.toggleTrackAction === 'PAUSE'
                    ? <Pause/>
                    : <Play/>
                }
            </div>
            <div>
                <img src={props.track.track.album.images[0]?.url || emptyPlaylistPhoto} alt={`Album ${props.track.track.album.name}`}/>
                <span>{props.track.track.name}</span>
            </div>
            <div>
                {props.track.track.artists.map((artist, index: number) => `${index ? ', ' : ''}${artist.name}`)} 
            </div>
            <div>
                {props.track.track.album.name} 
            </div>
            <div>
                {formatAddedAt(props.track.added_at)}
            </div>
            <div>
                {formatDuration(props.track.track.duration_ms)}
            </div>
            <div>
                <TrackOptions {...props} />
            </div>
        </PlaylistTableRow>
  )
})

export default PlaylistTrack
