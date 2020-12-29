import React, { useContext, useMemo } from 'react'
import styled, {css} from 'styled-components'
import { Track } from '../../../common/api/webapi/types'
import useAddToPlaylist from '../../../common/hooks/components/addPlaylist/useAddToPlaylist'
import { PlaylistTable, Button, colors, metrics, breakpoints, PlaylistTableRow } from '../../../styles/style'
import ListTracks from '../../common/listTracks/ListTracks'
import ContextImportTracks from '../ContextImportTracks'

const FoundTracksTable: React.FC = () => {
    const {foundTracks, actionStartResetImportTracks} = useContext(ContextImportTracks)
    const addToPlaylist = useAddToPlaylist()

    const addAllToPlaylist = () => {
        const uris = foundTracks.map(track => track.track?.uri || '').filter(v => v ? true : false)
        addToPlaylist('track', uris, response => {
            console.log(response)
        })
    }

    const tracks = useMemo(() => {
        let tracks: Track[] = []
        foundTracks.forEach(foundTrack => {
            if(foundTrack.track)
                tracks = [...tracks, foundTrack.track]
        })
        return tracks
    },[foundTracks])

    return(
        <TableBackground>
            <ListTracks tracks={tracks} additionalCSS={listTrackCSS}/>
            <ResultsButtons>
                <Button
                    typeButton="secondary"
                    onClick={actionStartResetImportTracks}
                >
                    Voltar
                </Button>
                <Button
                    onClick={addAllToPlaylist}
                >
                    Adicionar todas
                </Button>
            </ResultsButtons>
        </TableBackground>
    )
}

export default FoundTracksTable

const listTrackCSS = css`
    ${PlaylistTableRow}{
        @media(max-width: ${breakpoints.sml}){
            &:nth-child(2){
                padding-top: 10px;
            }
        }
    }
`

const ResultsButtons = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${metrics.spacing3} 0;

    ${Button}{
        min-width: inherit;
        padding: 8px 32px;
        font-size: 14px;

        &:first-child{
            margin: 0 ${metrics.spacing4} 0 0;
        }
    }

    @media(max-width: ${breakpoints.sml}){
        flex-flow: column nowrap;

        ${Button}{
            padding-top: 12px;
            padding-bottom: 12px;
            width: 100%;
            margin: 0;
            &:nth-child(2){
                order: 1;
            }
            &:nth-child(1){
                order: 2;
                margin: ${metrics.spacing3} 0 0 0;
            }
        }
    }
`

const TableBackground = styled.div`
    position: relative;
    background: ${colors.darkerBackground};
    border-radius: ${metrics.borderRadius};
    margin: ${metrics.spacing4} 0 0 0;
    display: flex;
    flex-flow: column nowrap;
    flex: 1 1 auto;

    @media(max-width: ${breakpoints.tbl}){
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        padding-bottom: ${metrics.spacing2};
    }

    @media(max-width: ${breakpoints.sml}){
        padding: 0 ${metrics.spacing3};
        border-radius: 0;
    }   
    ${PlaylistTable}{
        flex: 1 1 auto;
    }
`
