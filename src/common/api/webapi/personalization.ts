import { GetUserTopArtistsAndTracks, GetNextUserTopArtistsAndTracks } from "./types";
import qs from 'query-string'
import api from "../api";
import { getHeaders } from "../../helpers/helperWebAPI";

export const getUserTopArtistsAndTracks: GetUserTopArtistsAndTracks = async (accessToken, type, configs = {}) => {
    let data
    try{
        const queryParameters = qs.stringify(configs)
        const response = await api.spotify.get(`/me/top/${type}?${queryParameters}`, {...getHeaders(accessToken)})
        data = response.data
    }finally{
        return data || {}
    }
}

export const getNextUserTopArtistsAndTracks: GetNextUserTopArtistsAndTracks = async (accessToken, nextURL, configs) => {
    let data
    try{
        let [url, defaultParameters] = nextURL.split('?')
        const queryParameters = qs.stringify({...qs.parse(defaultParameters), ...configs} || {})
        const response = await api.spotify.get(`${url}?${queryParameters}`, {...getHeaders(accessToken)})
        data = response.data
    }finally{
        return data
    }
}