import {createContext} from 'react'
import { IPlaylist, ISavedTracks } from '../../common/api/webapi/types'

export interface IContextProps{
    updatePlaylist: Function
    updateSavedTracks: Function
    playlist: IPlaylist | null
    savedTracks: ISavedTracks | null
}

const ContextPlaylist = createContext({} as IContextProps)

export default ContextPlaylist
