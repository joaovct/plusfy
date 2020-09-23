import { Iplaylist } from './types'

export * from './playlists'

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

export const calculatePlaylistDuration = (playlist: Iplaylist) => {
    let totalMs = 0
    playlist.tracks.items.forEach(item => totalMs += item.track.duration_ms)
    const durationSplited = formatDuration(totalMs).split(':')

    return durationSplited.length > 2
        ? `${durationSplited[0]} hr  ${durationSplited[1]} min`
        : `${durationSplited[0]} min ${durationSplited[1]} sec`
 }

export const formatNumberTracks = (playlist: Iplaylist) => `${playlist.tracks.items.length} ${playlist.tracks.items.length > 1 ? 'músicas' : 'música'}`