import { DisabledStorage, DisabledTrack } from "./types"

interface Disable{
    userId: string
}

const localStoragePrefix = 'plusfy-user-'

export const initDisabledTracks = ({userId}: Disable) => {
    localStorage.setItem(`${localStoragePrefix}${userId}`, JSON.stringify(getDisabledStorage({userId})))
    return getDisabledStorage({userId})
}

export const getDisabledStorage = ({userId}: Disable): DisabledStorage => {
    const disabledTracks = localStorage.getItem(`${localStoragePrefix}${userId}`)
    return disabledTracks ? JSON.parse(disabledTracks) : {}
}

interface SetDisabledTracks extends Disable{
    tracks: DisabledTrack[]
    playlistURI: string
}

export const setDisabledTrack = ({userId, playlistURI, tracks}: SetDisabledTracks) => {
    let storage = getDisabledStorage({userId})

    const playlistIndex = storage.playlists ? storage.playlists.findIndex((playlist) => {
        return playlist.uri === playlistURI
    }) : -1
    
    if(playlistIndex >= 0){
        tracks.forEach(track => {
            if(track.uri && !isTrackDisabled({userId, playlistURI, tracks: [track]})[0]){
                storage.playlists[playlistIndex] = {
                    uri: playlistURI, tracks: [
                        ...storage.playlists[playlistIndex].tracks,
                        track
                    ]
                }
            }
        })
    }else{
        storage = {...storage, playlists: [...(storage.playlists ? storage.playlists : []), {uri: playlistURI, tracks}]}
    }
    localStorage.setItem(`${localStoragePrefix}${userId}`, JSON.stringify(storage))
    return getDisabledStorage({userId})
}

interface DeleteDisabledTrack extends SetDisabledTracks{}

export const deleteDisabledTrack = ({userId, playlistURI, tracks}: DeleteDisabledTrack) => {
    let storage = getDisabledStorage({userId})

    const playlistIndex = storage.playlists ? storage.playlists.findIndex((playlist) => {
        return playlist.uri === playlistURI
    }) : -1
    if(playlistIndex >= 0){
        tracks.forEach(track => {
            if(track.uri && isTrackDisabled({userId, playlistURI, tracks: [track]})[0]){
                storage.playlists[playlistIndex] = {
                    uri: playlistURI, tracks: [
                        ...storage.playlists[playlistIndex].tracks.filter(disabledTrack => disabledTrack.uri !== track.uri)
                    ]
                }
            }
        })
    }

    localStorage.setItem(`${localStoragePrefix}${userId}`, JSON.stringify(storage))
    return getDisabledStorage({userId})
}

interface IsTrackDisabled extends Disable{
    tracks: DisabledTrack[]
    playlistURI: string
}

export const isTrackDisabled = ({userId, tracks, playlistURI}: IsTrackDisabled): boolean[] => {
    const disabledTracks = getDisabledStorage({userId})

    return tracks.map(track => {
        const playlist = disabledTracks.playlists?.find(playlist => playlist.uri === playlistURI)
        if(playlist && playlist.tracks.find(disabledTrack => disabledTrack.uri === track.uri)){
            return true
        }
        return false
    })
}