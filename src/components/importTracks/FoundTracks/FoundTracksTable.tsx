import React, { useContext, useMemo } from 'react'
import { Clock } from 'react-feather'
import styled from 'styled-components'
import { Track } from '../../../common/api/webapi/types'
import useAddToPlaylist from '../../../common/hooks/components/addPlaylist/useAddToPlaylist'
import { PlaylistTable, PlaylistTableRow, Button, colors, metrics } from '../../../styles/style'
import ListTracks from '../../common/listTracks/ListTracks'
import ContextImportTracks from '../ContextImportTracks'
import FoundTrackRow from './FoundTrackRow'

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
            <ListTracks
                tracks={tracks}
            />
            {/* <PlaylistTable qntColumns={7}>
                <PlaylistTableRow>
                    <div>#</div>
                    <div>Título</div>
                    <div>Artista</div>
                    <div>Álbum</div>
                    <div>Arquivo</div>
                    <div><Clock/></div>
                    <div></div>
                </PlaylistTableRow>
                {
                    foundTracks.map((track, index) => {
                        if(track.track)
                            return(
                                <FoundTrackRow key={`foundtrack-${track.track.uri}-${index}`} foundTrack={track} index={index}/>
                            )
                        return <></>
                    })
                }
            </PlaylistTable>
            */}
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
`

const TableBackground = styled.div`
    background: ${colors.darkerBackground};
    border-radius: ${metrics.borderRadius};
    margin: ${metrics.spacing4} 0 0 0;
    position: relative;

    ${PlaylistTableRow}{
        div{
            &:nth-child(2){
                flex-grow: 10;
            }
            &:nth-child(6){
                max-width: 75px;
            }
            &:nth-child(7){
                max-width: 145px;
                ${Button}{
                    display: inline-block;
                    min-width: inherit;
                    font-size: 14px;
                    padding: 6px 32px;
                    margin: auto;
                }
            }
        }
    }
`
