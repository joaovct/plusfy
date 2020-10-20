import { ISpotifyPlayer_action, SPOTIFY_PLAYER } from "../store/spotifyPlayer/types";
import { Reducer } from "react";

const spotifyPlayerReducer: Reducer<{}, ISpotifyPlayer_action> = (state = {}, action) => {
    switch(action.type){
        case SPOTIFY_PLAYER:
            return action.payload
        default:
            return state
    }
}

export default spotifyPlayerReducer