import { ICurrentState } from "../../redux/store/currentState/types";
import { IPlaylist, Track } from "../api/webapi/types";

export const isPlayingTrack = (currentState: ICurrentState, trackUri: string) => {
    if(currentState?.item?.uri === trackUri)
        return true
    return false
}

export type ToggleTrackAction = "PLAY" | "PAUSE" | "RESUME"

export const toggleTrack = (currentState: ICurrentState, trackUri: string): ToggleTrackAction => {
    if(isPlayingTrack(currentState, trackUri) && currentState.is_playing)
        return "PAUSE"
    else if(isPlayingTrack(currentState, trackUri))
        return "RESUME"
    return "PLAY"
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

export const formatArtistName = (track: Track) => 
    track.artists.map((artist, index: number) => `${index ? ', ' : ''}${artist.name}`)

