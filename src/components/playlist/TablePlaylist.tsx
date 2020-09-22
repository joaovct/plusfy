import React from 'react';
import styled from 'styled-components';
import { metrics, colors, Container, Page } from '../../styles/style';
import { ChildComponent } from './types';
import {Calendar, Clock} from 'react-feather'
import PlaylistTrack from './PlaylistTrack';

const TablePlaylist: React.FC<ChildComponent> = ({playlist}) => {
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                playlist.tracks.items.map( (playlistTrack, index) => <PlaylistTrack key={`${playlistTrack}${index}`} playlistTrack={playlistTrack} index={index} /> )
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
            width: 42px;
            font-weight: 500;
            text-align: center;
        }
        &:nth-child(5){
            width: 157px;
        }
        &:nth-child(6){
            width: 64px;
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
            color: #fff;

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