import { IdisabledTracks } from "./types"

interface Idisable{
    userId: string
}

const localStoragePrefix = 'plusfy-user-'

export const initDisabledTracks = ({userId}: Idisable) => {
    localStorage.setItem(`${localStoragePrefix}${userId}`, JSON.stringify( getDisabledTracks({userId}) ))
    return getDisabledTracks({userId})
}

export const getDisabledTracks = ({userId}: Idisable): IdisabledTracks => {
    const disabledTracks = localStorage.getItem(`${localStoragePrefix}${userId}`)
    return disabledTracks ? JSON.parse(disabledTracks) : {}
}

interface IsetDisabledTrack extends Idisable{
    uri: string
    playlistUri: string
}

export const setDisabledTrack = ({userId, playlistUri, uri}: IsetDisabledTrack) => {
    let disabledTracks = getDisabledTracks({userId})

    if(disabledTracks.playlists){
        const playlistIncludedIndex = disabledTracks.playlists.findIndex( playlist => playlist.uri === playlistUri )
        if(playlistIncludedIndex > -1 && disabledTracks.playlists[playlistIncludedIndex].tracks.findIndex(track => track === uri)  === -1)
            disabledTracks.playlists[playlistIncludedIndex].tracks.push(uri)
        else if(playlistIncludedIndex === -1)
            disabledTracks.playlists.push({uri: playlistUri, tracks: [uri]})
    }else{
        disabledTracks.playlists = [{uri: playlistUri, tracks: [uri]}]
    }
    localStorage.setItem(`${localStoragePrefix}${userId}`, JSON.stringify(disabledTracks))
    return getDisabledTracks({userId})
}

interface IdeleteDisableTrack extends IsetDisabledTrack{}

export const deleteDisabledTrack = ({userId, playlistUri, uri}: IdeleteDisableTrack) => {
    const disabledTracks = getDisabledTracks({userId})

    disabledTracks.playlists = disabledTracks.playlists?.map(playlist => {
        if(playlist.uri === playlistUri)
            playlist.tracks = playlist.tracks.filter(item => item !== uri ? true : false)
        return playlist
    })

    localStorage.setItem(`${localStoragePrefix}${userId}`, JSON.stringify(disabledTracks))
    return getDisabledTracks({userId})
}

interface IisTrackDisabled extends Idisable{
    trackUri: string
    playlistUri: string
}

export const isTrackDisabled = ({userId, trackUri, playlistUri}: IisTrackDisabled) => {
    const disabledTracks = getDisabledTracks({userId})
    const disabledPlaylist = disabledTracks.playlists?.find(disabledPlaylist => disabledPlaylist.uri === playlistUri)
    if(disabledPlaylist){
        if(disabledPlaylist.tracks.find(disabledTrack => disabledTrack === trackUri)){
            return true
        }
    }
    return false
}