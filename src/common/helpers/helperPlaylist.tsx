import { ICurrentState } from "../../redux/store/currentState/types";
import { Playlist, Track } from "../api/webapi/types";
import emptyAlbumPhoto from '../../assets/empty-playlist-photo.svg'
import { FakePlaylist } from "../../components/playlist/types";

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

export const calculatePlaylistDuration = (playlist: Playlist | null) => {
    if(playlist){
        let totalMs = 0
        playlist.tracks.items.forEach(item => totalMs += item.track?.duration_ms || 0)
        const durationSplited = formatDuration(totalMs).split(':')
    
        return durationSplited.length > 2
            ? `${durationSplited[0]} hr  ${durationSplited[1]} min`
            : `${durationSplited[0]} min ${durationSplited[1]} sec`
    }
    return ''
 }

 export const formatPlaylistImage = (playlist: (Playlist | null), fakePlaylist: (FakePlaylist | null)): string => {
    if(playlist && playlist.images.length){
        return playlist.images[0].url
    }else if(fakePlaylist){
        let image: string = ''

        for(let i = 0; i < fakePlaylist.tracks.length; i++){
            if(fakePlaylist.tracks[0]?.album.images[0]){
                image = fakePlaylist.tracks[0]?.album.images[0].url
                break
            }
        }

        if(image){
            return image
        }
    }
    return emptyAlbumPhoto
}

export const formatTrackPhoto = (track?: Track) => {
    if(track?.album.images.length)
        return track.album.images[0].url
    return emptyAlbumPhoto
}

export const formatNumberTracks = (playlist: Playlist | null) => playlist
    ? `${playlist.tracks.items.length} ${playlist.tracks.items.length > 1 ? 'músicas' : 'música'}`
    : ''

export const formatArtistName = (track: Track) => {
    if(track)
        return track.artists.map((artist, index: number) => `${index ? ', ' : ''}${artist.name}`)
    return ''
}

const capitalizeString = (string: string): string => {
    const words = string.split(' ')
    if(words.length > 1)
        return words.reduce((prev, current) => {
            if(prev)
                return capitalizeString(prev) + ' ' + capitalizeString(current)
            return capitalizeString(current)
        })
    return words[0].toLowerCase().charAt(0).toUpperCase() + words[0].toLowerCase().slice(1)
}

export const formatArtistGenres = (genres: string[]): string => {
    if(genres.length && genres.length > 1)
        return genres.reduce((prev, current) => {
            prev = capitalizeString(prev)
            current = capitalizeString(current)
            if(prev)
                return prev + ', ' + current
            return prev
        })
    else if(genres.length)
        return capitalizeString(genres[0])
    return ''
}
