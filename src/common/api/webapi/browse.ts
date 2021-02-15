import { getHeaders } from "../../helpers/helperWebAPI";
import api from "../api";
import { GetRecommendations, GetRecommendationsResponse } from "./types";
import qs from 'query-string'

export const getRecommendations: GetRecommendations = async (accessToken, configs) => {
    const headers = getHeaders(accessToken)
    let res
    let queryString = qs.stringify(configs)
    try{
        res = await api.spotify.get<GetRecommendationsResponse>(`/recommendations?${queryString}`, headers)
    }finally{
        return res?.data ? {...res?.data} : {}
    }
}