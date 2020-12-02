import {createContext} from 'react'
import { IPlaylist, SavedTracks } from '../../common/api/webapi/types'

export interface IContextProps{
    updatePlaylist: () => void
    updateSavedTracks: Function
    playlist: IPlaylist | null
    savedTracks: SavedTracks | null
}

const ContextPlaylist = createContext({} as IContextProps)

export default ContextPlaylist
