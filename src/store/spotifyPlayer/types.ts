export const SPOTIFY_PLAYER = 'SPOTIFY_PLAYER'

export interface IspotifyPlayer_action {
    type: string
    payload: Spotify.SpotifyPlayer
}

export interface IspotifyPlayer extends Spotify.SpotifyPlayer {}