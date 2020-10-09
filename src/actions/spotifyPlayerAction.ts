import { IspotifyPlayer_action, SPOTIFY_PLAYER } from "../store/spotifyPlayer/types"

const spotifyPlayerAction = (spotifyPlayer: Spotify.SpotifyPlayer) => {

    const actionReturn: IspotifyPlayer_action = {
        type: SPOTIFY_PLAYER,
        payload: spotifyPlayer
    }
    return actionReturn
}

export default spotifyPlayerAction