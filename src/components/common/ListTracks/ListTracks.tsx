import React, { useState } from 'react'
import {PlaylistTable as playlisttable, PlaylistTableRow} from '../../../styles/style'
import {Clock} from 'react-feather'
import { ListTracksProps } from './types'
import styled from 'styled-components'
import TrackRow from './TrackRow/TrackRow'
import ContextListTracks, { HandleToggleOption } from './ContextListTracks'


const ListTracks: React.FC<ListTracksProps> = ({tracks}) => {
    const [toggleOptions, setToggleOptions] = useState(Array(tracks.length).fill(false))

    const handleToggleOption: HandleToggleOption = (index) => {
        setToggleOptions( value => [...value.map((e,i) => i === index ? !e : false)])
    }

    return(
        <ContextListTracks.Provider value={{handleToggleOption, toggleOptions}}>
            <PlaylistTable qntColumns={6}>
                <PlaylistTableRow>
                    <div>#</div>
                    <div>Título</div>
                    <div>Artista</div>
                    <div>Álbum</div>
                    <div><Clock/></div>
                    <div></div>
                </PlaylistTableRow>
                {
                    tracks.map((track, index) => (
                        <TrackRow track={track} index={index}/>
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
`

export default ListTracks