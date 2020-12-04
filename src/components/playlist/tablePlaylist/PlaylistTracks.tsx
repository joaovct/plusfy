import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import { metrics, colors, Container, Page, PlaylistTableRow} from '../../../styles/style';
import ContextPlaylist from '../ContextPlaylist';
import ListTracks from '../../common/ListTracks/ListTracks';
import { AdditionalColumn } from '../../common/ListTracks/types';
import { Calendar } from 'react-feather';
import { formatAddedAt } from '../../../common/helpers/helperPlaylistTable';

const PlaylistTracks = () => {
    const {playlist} = useContext(ContextPlaylist)

    const tracks = useMemo(() => {
        return playlist?.tracks.items.map(item => item.track) || []
    },[playlist])

    const additionalColumns = useMemo<AdditionalColumn[]>(() => [
        {
            headerContent: <Calendar/>,
            bodyContent: playlist?.tracks.items.map(item => formatAddedAt(item.added_at)) || []
        }
    ],[playlist])

    return (
        <ComponentContent>
            <Container>
                {
                    playlist ?
                        <ListTracks
                            tracks={tracks}
                            additionalColumns={additionalColumns}
                            additionalCSS={ListTrackCSS}
                        />
                    : <></>
                }
            </Container>
        </ComponentContent>
    )
}

export default PlaylistTracks

const ListTrackCSS = `
    ${PlaylistTableRow}{
        div{
            &:nth-child(2){
                flex-grow: 5;
            }
            &:nth-child(6){
                order: 5;
                max-width: 165px;
            }
            &:nth-child(5){
                order: 6;
                max-width: 75px;
            }
            &:nth-child(7){
                order: 7;
                max-width: 55px;
                overflow: inherit;
                svg{
                    cursor: pointer;
                }
            }
        }
    }
`

const ComponentContent = styled(Page)`
    margin: ${metrics.spacing5} 0 0 0;
    background: ${colors.darkerBackground};

    @media(max-width: 576px){
        margin: ${metrics.spacing4} 0 0 0;
    }
`