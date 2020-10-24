import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { metrics, colors, Container, Page } from '../../styles/style';
import { IPlaylistChildComponent } from './types';
import {Calendar, Clock} from 'react-feather'
import PlaylistTrack from './PlaylistTrack';
import { useSelector } from 'react-redux';
import { IStore } from '../../store/types';
import { ICurrentState } from '../../store/currentState/types';
import { isTrackDisabled } from '../../api/disabledTracks/disabledTracks';
import { IUser } from '../../store/user/types';


const TablePlaylist: React.FC<IPlaylistChildComponent> = ({playlist}) => {
    const [showOptions, setShowOptions] = useState<Array<Boolean>>(Array(playlist.tracks.items.length).fill(false))
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)
    const {id: userId} = useSelector<IStore, IUser>(store => store.user)
    
    const handleShowOptions = useCallback((index: number) =>
        setShowOptions(old => [...old.map( (_, n) => n === index ? !old[n] : false)])
    ,[setShowOptions])

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
                                        let isDisabled = isTrackDisabled({userId, trackUri: playlistTrack.track.uri, playlistUri: playlist.uri})
                                        return (
                                            <PlaylistTrack 
                                                key={playlistTrack.track.id}
                                                index={index}
                                                playlist={playlist}
                                                playlistTrack={playlistTrack}
                                                isDisabled={isDisabled}
                                                currentState={currentState}
                                                showOptions={showOptions}
                                                handleShowOptions={handleShowOptions}
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