import {createContext} from 'react'
import { IPlaylist, ISavedTracks } from '../../api/webapi/types'

export interface IContextProps{
    updatePlaylists: Function
    updateSavedTracks: Function
    playlist: IPlaylist | null
    savedTracks: ISavedTracks | null
}

const ContextPlaylist = createContext({} as IContextProps)

export default ContextPlaylist
