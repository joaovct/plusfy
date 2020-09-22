import React, { useCallback } from 'react';
import styled from 'styled-components';
import { IplaylistTrack } from '../../api/webapi/types';
import { formatAddedAt, formatDuration } from '../../api/webapi/webapi';
import emptyPlaylistPhoto from '../../assets/empty-user-photo.svg'
import {Play} from 'react-feather'
import { useSelector } from 'react-redux';
import { Istore } from '../../store/types';
import { playTrack } from '../../api/webapi/player';
import { Itoken } from '../../store/token/types';

interface Icomponent{
    playlistTrack: IplaylistTrack,
    index: number
}

const PlaylistTrack: React.FC<Icomponent> = ({playlistTrack, index}) => {
    const {accessToken} = useSelector<Istore, Itoken>(store => store.token)

    const handlePlayTrack = useCallback((uri: string) => playTrack({accessToken, uris: [uri]})
    ,[accessToken])

    return (
    <TableRow key={playlistTrack.track.id}>
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
    </TableRow>
  )
}

export default PlaylistTrack

const TableRow = styled.tr`
    td:first-child{
        position: relative;

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

    &:hover td:first-child{
        span{
            opacity: 0;
        }
        svg{
            opacity: 1;
        }
    }
`