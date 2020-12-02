import {createContext} from 'react'

export type HandleToggleOption = (index: number) => void

export interface ContextProps{
    handleToggleOption: HandleToggleOption
    toggleOptions: boolean[]
}

const ContextListTracks = createContext({} as ContextProps)

export default ContextListTracks