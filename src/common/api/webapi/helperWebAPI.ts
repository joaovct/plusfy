import { nextPlayer } from "./player";
import { IPlayerDevice, IPlaylist } from "./types";

export const getHeaders = (accessToken: string) => {
    return {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
}

export const defineActiveDevice = (devices?: Array<IPlayerDevice>): IPlayerDevice | null => (
    devices ? devices.find(device => device.is_active) || devices[0] : null
)

let lastUri = ''

export const preventDoubleNextPlayer = (uri: string, accessToken: string) => {
    if(uri !== lastUri){
        nextPlayer({accessToken})
        lastUri = uri
    }
}

export const formatAddedAt = (trackAddedAt: string) => {
    const date = new Date(trackAddedAt)
    return date.toLocaleDateString('pt-br', {month: 'short', day: '2-digit', year: '2-digit'})
}

export const formatDuration = (totalMs: number) => {
    const totalSeconds = Math.floor( totalMs / 1000 )
    const totalMinutes = Math.floor( totalMs / 60000 )

    let seconds = ( Math.floor(totalSeconds % 60) ).toString()
    let minutes = ( Math.floor(totalMinutes % 60) ).toString()
    let hours = ( Math.floor( totalMs / 3600000 ) )

    seconds = parseInt(seconds) < 10 ? `0${seconds}` : seconds
    minutes = minutes === '0' ? '00' : minutes

    return `${hours ? `${hours}:` : ''}${minutes}:${seconds}` 
}

export const calculatePlaylistDuration = (playlist: IPlaylist | null) => {
    if(playlist){
        let totalMs = 0
        playlist.tracks.items.forEach(item => totalMs += item.track.duration_ms)
        const durationSplited = formatDuration(totalMs).split(':')
    
        return durationSplited.length > 2
            ? `${durationSplited[0]} hr  ${durationSplited[1]} min`
            : `${durationSplited[0]} min ${durationSplited[1]} sec`
    }
    return ''
 }

export const formatNumberTracks = (playlist: IPlaylist | null) => playlist
    ? `${playlist.tracks.items.length} ${playlist.tracks.items.length > 1 ? 'músicas' : 'música'}`
    : ''

export const encodeSpaces = (string: string) => string.replace(' ', '%20')