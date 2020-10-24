import {createContext} from 'react'

export interface IContextProps{
    updatePlaylists: Function
}

const ContextPlaylist = createContext({} as IContextProps)

export default ContextPlaylist
