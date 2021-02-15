import {createContext} from 'react'
import { Playlist, SavedTracks } from '../../common/api/webapi/types'
import { FakePlaylist } from './types'

export interface IContextProps{
    updatePlaylist: () => void
    updateSavedTracks: Function
    playlist: Playlist | null
    fakePlaylist: FakePlaylist | null
    savedTracks: SavedTracks | null
}

const ContextPlaylist = createContext({} as IContextProps)

export default ContextPlaylist
