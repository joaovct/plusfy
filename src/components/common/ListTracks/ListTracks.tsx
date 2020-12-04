import React, { useEffect } from 'react'
import {PlaylistTable as playlisttable, PlaylistTableRow} from '../../../styles/style'
import {Clock} from 'react-feather'
import { ListTracksProps } from './types'
import styled from 'styled-components'
import TrackRow from './TrackRow/TrackRow'
import ContextListTracks from './ContextListTracks'
import useListTracks from '../../../common/hooks/components/useListTracks'

const ListTracks: React.FC<ListTracksProps> = ({tracks, additionalColumns, additionalCSS}) => {
    const listTracks = useListTracks()
    const qntColumns = 6 + (additionalColumns?.length || 0)

    useEffect(() => {
        listTracks.updateQuantitySavedTracks(tracks)
    //eslint-disable-next-line
    },[tracks])
    
    return(
        <ContextListTracks.Provider value={{...listTracks, additionalColumns}}>
            <PlaylistTable qntColumns={qntColumns} additionalCSS={additionalCSS}>
                <PlaylistTableRow>
                    <div>#</div>
                    <div>Título</div>
                    <div>Artista</div>
                    <div>Álbum</div>
                    <div><Clock/></div>
                    {
                        additionalColumns?.map(column => (
                            <div>{column.headerContent}</div>
                        ))
                    }
                    <div></div>
                </PlaylistTableRow>
                {
                    tracks.map((track, index) => (
                        <TrackRow key={`listtracks${track.uri}${index}`} track={track} index={index}/>
                    ))
                }
            </PlaylistTable>
        </ContextListTracks.Provider>
    )
}

const PlaylistTable = styled(playlisttable)`
    ${PlaylistTableRow}{
        div{
            &:nth-child(5){
                max-width: 75px;
            }
            &:last-child{
                max-width: 55px;
                overflow: inherit;
                svg{
                    cursor: pointer;
                }
            }
        }
    }

    ${({additionalCSS}) => additionalCSS}
`

export default ListTracks