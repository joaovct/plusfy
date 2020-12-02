import {createContext} from 'react'
import { SavedTracks } from '../../../common/api/webapi/types'

export type HandleToggleOption = (index: number) => void

export interface ContextProps{
    handleToggleOption: HandleToggleOption
    toggleOptions: boolean[]
    savedTracks: SavedTracks | null
    updateSavedTracks: () => void
}

const ContextListTracks = createContext({} as ContextProps)

export default ContextListTracks