import React, { createContext, useState } from 'react'

type State = 'adding' | 'added' | 'error'
type Action = 'track' | 'playlist'
type Uris = Array<string>

type Status = {
    state: State
    action: Action
    uris: Uris
} | null 

interface AddPlaylist{
    (action: Action, uri: Uris): void
}

interface UpdateStatus{
    (state: State): void
}

interface ContextValue{
    addPlaylist: AddPlaylist
    updateStatus: UpdateStatus
    status: Status
}

export const AddPlaylistContext = createContext<ContextValue>({
    status: null,
    updateStatus: () => {},
    addPlaylist: () => {}
})

const AddPlaylistProvider = ({children}: {children: JSX.Element}) => {
    const [status, setStatus] = useState<Status>(null)
    // const [status, setStatus] = useState<Status>({state: 'adding', action: 'track', uris: []})

    const addPlaylist: AddPlaylist = (action, uris) => 
        setStatus({state: 'adding', action, uris})

    const updateStatus: UpdateStatus = (state) =>
        setStatus(old => old ? {...old, state} : old)

    return(
        <AddPlaylistContext.Provider value={{addPlaylist, updateStatus, status}}>
            {children}
        </AddPlaylistContext.Provider>
    )
}

export default AddPlaylistProvider