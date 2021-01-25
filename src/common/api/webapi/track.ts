import { getHeaders } from "../../helpers/helperWebAPI";
import api from "../api";
import { GetAudioFeatures } from "./types";

export const getAudioFeatures: GetAudioFeatures = async (accessToken, ids) => {
    const response = await api.spotify.get(`/audio-features?ids=${ids.toString()}`, {...getHeaders(accessToken)})

    return {
        audio_features: [ ...(response?.data?.audio_features ? response?.data?.audio_features : []) ]
    }
}