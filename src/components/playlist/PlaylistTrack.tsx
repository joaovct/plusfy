import React from 'react';
import styled from 'styled-components';
import { IplaylistTrack } from '../../api/webapi/types';
import { formatAddedAt, formatDuration } from '../../api/webapi/webapi';
import emptyPlaylistPhoto from '../../assets/empty-user-photo.svg'
import {Play} from 'react-feather'

interface Icomponent{
    playlistTrack: IplaylistTrack,
    index: number
}

const PlaylistTrack: React.FC<Icomponent> = ({playlistTrack, index}) => {
  return (
    <TableRow key={playlistTrack.track.id}>
        <td>
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
            cursor: pointer;
            opacity: 0;
            height: 18px;
            width: 18px;
            position: absolute;
            left: calc( (18px / 4) + 18px / 2 );
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