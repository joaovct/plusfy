import { ISpotifyPlayer_action, SPOTIFY_PLAYER } from "../store/spotifyPlayer/types"

const spotifyPlayerAction = (spotifyPlayer: Spotify.SpotifyPlayer) => {

    const actionReturn: ISpotifyPlayer_action = {
        type: SPOTIFY_PLAYER,
        payload: spotifyPlayer
    }
    return actionReturn
}

export default spotifyPlayerAction