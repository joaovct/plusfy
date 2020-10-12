import React, { useCallback } from 'react';
import styled from 'styled-components';
import { IplaylistTrack } from '../../api/webapi/types';
import { formatAddedAt, formatDuration } from '../../api/webapi/webapi';
import emptyPlaylistPhoto from '../../assets/empty-playlist-photo.svg'
import {Play} from 'react-feather'
import { useSelector } from 'react-redux';
import { Istore } from '../../store/types';
import { playTrack } from '../../api/webapi/player';
import { Itoken } from '../../store/token/types'
import { PlaylistChildComponent } from './types';
import TrackOptions from './TrackOptions'
import useGetCurrentState from '../../hooks/useGetCurrentState';
import { colors } from '../../styles/style';

interface Icomponent extends PlaylistChildComponent{
    playlistTrack: IplaylistTrack,
    index: number
    showOptions: Array<Boolean>
    handleShowOptions: Function
}

const PlaylistTrack: React.FC<Icomponent> = ({playlist, playlistTrack, index, showOptions, handleShowOptions}) => {
    const {accessToken} = useSelector<Istore, Itoken>(store => store.token)
    const currentState = useGetCurrentState()

    const handlePlayTrack = useCallback( (uri: string) => playTrack({accessToken, contextUri: playlist.uri, offset: {uri}})
    ,[playlist, accessToken])

    return (
        <TableRow thisIsPlaying={currentState?.item?.id === playlistTrack.track.id} key={playlistTrack.track.id}>
            <td onClick={() => {handlePlayTrack(playlistTrack.track.uri)}}>
                <span>{index + 1}</span>
                <Play/>
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
                <TrackOptions showOptions={showOptions} handleShowOptions={handleShowOptions} index={index}/>
            </td>
        </TableRow>
  )
}

export default PlaylistTrack

const TableRow = styled.tr<{thisIsPlaying: boolean}>`
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

    td:last-child{
        overflow: visible;
        position: relative;

        svg{
            cursor: pointer;
        }
    }

    &:hover td:first-child{
        span{
            opacity: 0;
        }
        svg{
            opacity: 1;
        }
    }
`