import React, { useEffect } from 'react'
import {PlaylistTable, PlaylistTableRow} from '../../../styles/style'
import {Clock} from 'react-feather'
import TrackRow from './TrackRow/TrackRow'
import ContextListTracks from './ContextListTracks'
import useListTracks from '../../../common/hooks/components/listTracks/useListTracks'
import {ListTracksProps} from './types'

const ListTracks: React.FC<ListTracksProps> = (props) => {
    const {tracks, additionalColumns, additionalCSS} = {...props} 
    const listTracks = useListTracks()
    const qntColumns = 5 + (additionalColumns?.length || 0)

    useEffect(() => {
        listTracks.updateQuantitySavedTracks(tracks)
    //eslint-disable-next-line
    },[tracks])
    
    return(
        <ContextListTracks.Provider value={{...listTracks, ...props, viewMode: props.viewMode || 'full'}}>
            <PlaylistTable qntColumns={qntColumns} additionalCSS={additionalCSS} showHeader={props.showHeader}>
                <PlaylistTableRow>
                    <div>#</div>
                    <div>Título</div>
                    <div>Álbum</div>
                    {
                        additionalColumns?.map((column, index) => (
                            <div key={`listtrackcolumnheader-${column.headerContent}-${index}`}>
                                {column.headerContent}
                            </div>
                        ))
                    }
                    <div><Clock/></div>
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

export default ListTracks