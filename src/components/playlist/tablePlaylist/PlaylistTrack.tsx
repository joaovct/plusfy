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
import { formatAddedAt, formatDuration } from '../../../common/helpers/helperPlaylistTable';


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
    
    const isPlayingCurrentTrack = () => {
        if(currentState?.item?.uri === track.track.uri)
            return true
        return false
    }

    const handlePlayTrack = () => {
        if(playlist){
            if(isPlayingCurrentTrack() && currentState.is_playing)
                return pausePlayer({accessToken})
            else if(isPlayingCurrentTrack())
                return resumePlayer({accessToken})
            playTrack({accessToken, contextUri: playlist.uri, offset: {uri: track.track.uri}})
        }
    }

    const getPlayPause = () => {
        if(isPlayingCurrentTrack()){
            if(currentState?.is_playing)
                return <Pause/>
            return <Play/>
        }
        return <Play/>
    }

    return (
        <PlaylistTableRow uri={track.track.uri} playingUri={currentState.item?.uri} disabled={disabled}>
            <div onClick={handlePlayTrack}>
                <span>{index + 1}</span>
                {
                    getPlayPause()
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
    div{
        &:last-child{
            overflow: inherit;

            svg{
                cursor: pointer;
            }
        }
    }
`