import { getHeaders } from "../../helpers/helperWebAPI";
import api from "../api";
import { GetAudioFeatures, GetTracks } from "./types";

export const getAudioFeatures: GetAudioFeatures = async (accessToken, ids) => {
    const response = await api.spotify.get(`/audio-features?ids=${ids.toString()}`, {...getHeaders(accessToken)})

    return {
        audio_features: [ ...(response?.data?.audio_features ? response?.data?.audio_features : []) ]
    }
}

export const getTracks: GetTracks = async (accessToken, ids) => {
    const headers = getHeaders(accessToken)
    const response = await api.spotify.get(`/tracks?ids=${ids.toString()}`, headers)

    return response.data || {}
}