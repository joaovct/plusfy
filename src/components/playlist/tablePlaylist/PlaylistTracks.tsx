import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import usePlaylistTracks from '../../../common/hooks/components/playlist/usePlaylistTracks';
import { IStore } from '../../../redux/store/types';
import { IUser } from '../../../redux/store/user/types';
import { metrics, colors, Container, Page, PlaylistTable, PlaylistTableRow, Dropdown, breakpoints} from '../../../styles/style';
import ListTracks from '../../common/listTracks/ListTracks';
import ContextPlaylist from '../ContextPlaylist';

const PlaylistTracks = () => {
    const {playlist} = useContext(ContextPlaylist)
    const {tracks, additionalColumns, additionalOptions} = usePlaylistTracks()
    const {id: userId = ''} = useSelector<IStore, IUser>(store => store.user)

    return (
        <ComponentContent isUserOwner={playlist?.owner.id === userId}>
            <Container>
                <ListTracks
                    tracks={tracks}
                    additionalColumns={additionalColumns}
                    additionalTrackRowOptions={additionalOptions}
                    contextUri={playlist?.uri}
                />
            </Container>
        </ComponentContent>
    )
}

export default PlaylistTracks


const ComponentContent = styled(Page)<{isUserOwner: boolean}>`
    flex: 1 1 auto;
    margin: ${metrics.spacing5} 0 0 0;
    background: ${colors.darkerBackground};

    @media(max-width: ${breakpoints.tbp}){
        margin: ${metrics.spacing4} 0 0 0;
    }

    ${PlaylistTable} ${PlaylistTableRow}{
        div{
            &:nth-child(4){
                max-width: 165px;
                @media(max-width: ${breakpoints.lg}){
                    display: none;
                }
            }
            &:last-child{
                ${({isUserOwner}) => {
                    if(isUserOwner)
                        return`
                            ${Dropdown}{
                                li:nth-child(2),
                                li:nth-child(3){
                                    display: none;
                                }
                            }
                        `
                    return `
                        ${Dropdown}{
                            li:nth-last-child(2),
                            li:nth-last-child(3){
                                display: none;
                            }
                        }      
                    `
                }}
            }
        }

        @media(max-width: ${breakpoints.sml}){
            &:nth-child(2){
                padding-top: 10px;
            }
        }
    }
`