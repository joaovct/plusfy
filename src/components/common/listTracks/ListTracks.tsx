import React, { useEffect, useState } from 'react'
import {PlaylistTable, PlaylistTableRow} from '../../../styles/style'
import {Clock} from 'react-feather'
import TrackRow from './TrackRow/TrackRow'
import ContextListTracks from './ContextListTracks'
import useListTracks from '../../../common/hooks/components/listTracks/useListTracks'
import {ListTracksProps} from './types'
import { Track } from '../../../common/api/webapi/types'

const filterTracks = (tracks: Track[]) => {
    return [...tracks.filter(track => track !== null)]
}

const ListTracks: React.FC<ListTracksProps> = (props) => {
    const {additionalColumns, additionalCSS} = {...props} 
    const [tracks, setTracks] = useState<Track[]>([])
    const listTracks = useListTracks()
    const qntColumns = 5 + (additionalColumns?.length || 0)

    useEffect(() => {
        setTracks(filterTracks(props.tracks))
    },[props.tracks])

    useEffect(() => {
        listTracks.updateQuantitySavedTracks(tracks)
    //eslint-disable-next-line
    },[tracks])
    
    return(
        <ContextListTracks.Provider value={{
            ...listTracks, ...props, viewMode: props.viewMode || 'full', continuousPlayback: props.continuousPlayback || true
        }}>
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
                        <TrackRow key={`listtracks${track?.uri}${index}`} track={track} index={index}/>
                    ))
                }
            </PlaylistTable>
        </ContextListTracks.Provider>
    )
}

export default ListTracks