import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import { IPlayer, IPlaylistTrack } from '../../common/api/webapi/types';
import { formatAddedAt, formatDuration } from '../../common/api/webapi/webAPI';
import emptyPlaylistPhoto from '../../assets/empty-playlist-photo.svg'
import {Play, Pause} from 'react-feather'
import { useSelector } from 'react-redux';
import { IStore } from '../../redux/store/types';
import { pausePlayer, resumePlayer, playTrack } from '../../common/api/webapi/player';
import { IToken } from '../../redux/store/token/types'
import TrackOptions from './TrackOptions'
import { colors } from '../../styles/style';
import ContextPlaylist from './ContextPlaylist';

interface Icomponent{
    currentState: IPlayer
    index: number
    playlistTrack: IPlaylistTrack
    showOptions: Array<Boolean>
    isDisabled: boolean
    handleShowOptions: Function
}

const PlaylistTrack: React.FC<Icomponent> = ({currentState,isDisabled,index,playlistTrack,showOptions,handleShowOptions}) => {
    const {playlist} = useContext(ContextPlaylist)
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)

    const handlePlayTrack = useCallback((uri: string) => playlist
        ? currentState?.item?.uri === uri
            ? currentState.is_playing
                ? pausePlayer({accessToken})
                : resumePlayer({accessToken}) 
            : playTrack({accessToken, contextUri: playlist.uri, offset: {uri}})
        : null
    ,[playlist, accessToken, currentState])

    return (
        <TableRow 
            key={playlistTrack.track.id}
            thisIsPlaying={currentState?.item?.id === playlistTrack.track.id}
            isDisabled={isDisabled}
        >
            <td onClick={() => {handlePlayTrack(playlistTrack.track.uri)}}>
                <span>{index + 1}</span>
                {
                currentState?.item?.id === playlistTrack.track.id 
                ? currentState.is_playing ? <Pause/> : <Play/>
                : <Play/> 
                }
            </td>
            <td>
                {
                    playlistTrack.track.album.images.length
                    ? <img src={playlistTrack.track.album.images[0].url} alt={`Album ${playlistTrack.track.album.name}`}/>
                    : <img src={emptyPlaylistPhoto} alt={`Album ${playlistTrack.track.album.name}`}/>
                }
                {playlistTrack.track.name}
            </td>
            <td> 
                {playlistTrack.track.artists.map((artist, index: number) => `${index ? ', ' : ''}${artist.name}`)} 
            </td>
            <td> {playlistTrack.track.album.name} </td>
            <td>{formatAddedAt(playlistTrack.added_at)}</td>
            <td>{formatDuration(playlistTrack.track.duration_ms)}</td>
            <td>
                <TrackOptions
                    index={index}
                    showOptions={showOptions}
                    handleShowOptions={handleShowOptions}
                    isDisabled={isDisabled}
                    playlistTrack={playlistTrack}
                />
            </td>
        </TableRow>
  )
}

export default PlaylistTrack

const TableRow = styled.tr<{thisIsPlaying: boolean, isDisabled: boolean}>`
    td{
        transition: opacity .25s;
    }

    td:first-child{
        position: relative;

        span{
            width: 100%;
            display: inline-block;
        }

        svg{
            --size-icon-play: 18px;
            cursor: pointer;
            opacity: 0;
            height: var(--size-icon-play);
            width: var(--size-icon-play);
            position: absolute;
            margin: 0 auto;
            left: calc( var(--width-first-child) / 2 - var(--size-icon-play) / 2 ) ;
            fill: #fff;
        }
    }

    td:first-child span,
    td:nth-child(2){
        color: ${({thisIsPlaying}) => thisIsPlaying ? `${colors.primary}` : '#fff'};
        transition: color .25s;
    }

    td:not(:last-child){
        ${ ({isDisabled}) =>  isDisabled ?
        `
            opacity: .4;
            pointer-events: none;
        `
        : '' }
    }

    td:last-child{
        overflow: visible;
        position: relative;

        svg{
            cursor: pointer;
        }
    }

    &:hover td:first-child{
        ${ ({isDisabled}) => !isDisabled ? 
            `
            span{
                opacity: 0;
            }
            svg{
                opacity: 1;
            }
            `
            : ''
        }
    }
`