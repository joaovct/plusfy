export const SPOTIFY_PLAYER = 'SPOTIFY_PLAYER'

export interface ISpotifyPlayer_action {
    type: string
    payload: Spotify.SpotifyPlayer
}

export interface ISpotifyPlayer extends Spotify.SpotifyPlayer {}