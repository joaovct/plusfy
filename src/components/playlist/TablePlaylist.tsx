import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { metrics, colors, Container, Page } from '../../styles/style';
import { PlaylistChildComponent } from './types';
import {Calendar, Clock} from 'react-feather'
import PlaylistTrack from './PlaylistTrack';
import { useSelector } from 'react-redux';
import { Istore } from '../../store/types';
import { IdisabledTracks } from '../../api/disabledTracks/types';
import { IplaylistTrack } from '../../api/webapi/types';
import { IcurrentState } from '../../store/currentState/types';


const TablePlaylist: React.FC<PlaylistChildComponent> = ({playlist}) => {
    const [showOptions, setShowOptions] = useState<Array<Boolean>>(Array(playlist.tracks.items.length).fill(false))
    const disabledTracks = useSelector<Istore, IdisabledTracks>(store => store.disabledTracks)
    const currentState = useSelector<Istore, IcurrentState>(store => store.currentState)

    const handleShowOptions = useCallback((index: number) => setShowOptions(old => [...old.map( (_, n) => n === index ? !old[n] : false)])
    ,[setShowOptions])

    const isTrackDisabled = useCallback((playlistTrack: IplaylistTrack) => {
        const playlistIncluded = disabledTracks.playlists?.find(disabledPlaylist => disabledPlaylist.uri === playlist.uri)
        if(playlistIncluded && playlistIncluded.tracks.find(track => track === playlistTrack.track.uri)  ){
            return true
        }
        return false
    },[disabledTracks, playlist])

    return (
        <Table>
        <Container>
            {
                playlist ?
                <> 
                    <TableInner>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Título</th>
                                <th>Artista</th>
                                <th>Álbum</th>
                                <th> <Calendar/> </th>
                                <th> <Clock/> </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                playlist.tracks.items.map((playlistTrack, index) => {
                                    let isDisabled = isTrackDisabled(playlistTrack)
                                    return (
                                        <PlaylistTrack 
                                            key={playlistTrack.track.id}
                                            index={index}
                                            currentState={currentState}
                                            playlist={playlist}
                                            playlistTrack={playlistTrack}
                                            showOptions={showOptions}
                                            handleShowOptions={handleShowOptions}
                                            isDisabled={isDisabled}
                                        />
                                    )
                                })
                            }
                        </tbody>
                    </TableInner> 
                </> : <></>
            }
        </Container>
    </Table>
    )
}

export default TablePlaylist

const TableInner = styled.table`
    width: 100%;
    table-layout: fixed;
    
    thead tr th,
    tbody tr td{
        font-size: 16px;
        text-align: left;
        vertical-align: middle;
        padding: 10px 15px;
        color: ${colors.gray};

        &:first-child{
            --width-first-child: 60px;
            width: var(--width-first-child);
            font-weight: 500;
            text-align: center;
        }
        &:nth-child(5){
            width: 157px;
        }
        &:nth-child(6){
            width: 70px;
        }
        &:nth-child(7){
            width: 50px;
        }

        @media(max-width: 991px){
            &:nth-child(5){
                display: none;
            }
        }
        @media(max-width: 768px){
            &:nth-child(6){
                display: none;
            }
        }
        @media(max-width: 576px){
            &:nth-child(4){
                display: none;
            }
        }
    }

    thead tr th{
        font-weight: 600;
        text-transform: uppercase;

        svg{
            stroke: ${colors.gray};
        }
    }
    
    tbody tr td{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        &:nth-of-type(2){
            width: 100%;
            display: flex;
            align-items: center;

            img{
                height: 38px;
                width: 38px;
                object-fit: contain;
                margin: 0 ${metrics.spacing3} 0 0;
            }
        }
    }
`

const Table = styled(Page)`
    margin: ${metrics.spacing5} 0 0 0;
    background: ${colors.darkerBackground};

    @media(max-width: 576px){
        margin: ${metrics.spacing4} 0 0 0;
    }
`