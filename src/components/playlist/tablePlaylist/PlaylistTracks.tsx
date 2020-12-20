import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import usePlaylistTracks from '../../../common/hooks/components/playlist/usePlaylistTracks';
import { metrics, colors, Container, Page, PlaylistTableRow, Dropdown, breakpoints} from '../../../styles/style';
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

const ListTrackCSS = css`
    ${PlaylistTableRow}{
        div{
            &:nth-child(4){
                max-width: 165px;
                @media(max-width: ${breakpoints.lg}){
                    display: none;
                }
            }
            &:last-child{
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
    flex: 1 1 auto;
    margin: ${metrics.spacing5} 0 0 0;
    background: ${colors.darkerBackground};

    @media(max-width: ${breakpoints.tbp}){
        margin: ${metrics.spacing4} 0 0 0;
    }
`