import React, { createContext, useState } from 'react'

type Action = 'track' | 'playlist'
type Uris = Array<string>
interface Configs{
    alertAfterTrackAdded: boolean
}

interface AddToPlaylist{
    (action: Action, uri: Uris, callback?: Callback, configs?: Configs): void
}

type CallbackResponse = 'success' | 'error'
type Callback = (response: 'success' | 'error') => void

type State = 'none' | 'adding'

type Status = {
    state: State
    uris: Uris
    action: Action
    configs?: Configs
} | null

interface ExecuteCallback{
    (response: CallbackResponse): void
}

interface ContextValue{
    addToPlaylist: AddToPlaylist
    executeCallback: ExecuteCallback
    status: Status
}

export const AddToPlaylistContext = createContext<ContextValue>({
    status: null,
    addToPlaylist: () => {},
    executeCallback: () => {}
})

const AddToPlaylistProvider = ({children}: {children: JSX.Element}) => {
    const [status, setStatus] = useState<Status>(null)
    const [callback, setCallback] = useState<Callback | null>(null)

    const addToPlaylist: AddToPlaylist = (action, uris, callback, configs = {alertAfterTrackAdded: true}) => {
        setStatus({state: 'adding', action, uris, configs})
        setCallback(() => callback)
    } 

    const executeCallback: ExecuteCallback = (response) => {
        if(callback){
            callback(response)
            setStatus(null)
            setCallback(null)
        }
    }

    return(
        <AddToPlaylistContext.Provider value={{addToPlaylist, executeCallback, status}}>
            {children}
        </AddToPlaylistContext.Provider>
    )
}

export default AddToPlaylistProvider