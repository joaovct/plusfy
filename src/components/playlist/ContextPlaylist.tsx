import {createContext} from 'react'
import { Playlist, SavedTracks } from '../../common/api/webapi/types'

export interface IContextProps{
    updatePlaylist: () => void
    updateSavedTracks: Function
    playlist: Playlist | null
    savedTracks: SavedTracks | null
}

const ContextPlaylist = createContext({} as IContextProps)

export default ContextPlaylist
