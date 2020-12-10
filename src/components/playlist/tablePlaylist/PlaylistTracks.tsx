import React, { useContext } from 'react';
import styled from 'styled-components';
import usePlaylistTracks from '../../../common/hooks/components/playlist/usePlaylistTracks';
import { metrics, colors, Container, Page, PlaylistTableRow, Dropdown} from '../../../styles/style';
import ListTracks from '../../common/listTracks/ListTracks';
import ContextPlaylist from '../ContextPlaylist';

const PlaylistTracks = () => {
    const {playlist} = useContext(ContextPlaylist)
    const {tracks, additionalColumns, additionalOptions} = usePlaylistTracks()

    return (
        <ComponentContent>
            <Container>
                <ListTracks
                    tracks={tracks}
                    additionalColumns={additionalColumns}
                    additionalTrackRowOptions={additionalOptions}
                    additionalCSS={ListTrackCSS}
                    contextUri={playlist?.uri}
                />
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

                ${Dropdown}{
                    li:nth-child(2),
                    li:nth-child(3){
                        display: none;
                    }
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