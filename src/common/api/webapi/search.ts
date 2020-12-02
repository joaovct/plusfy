import api from "../api"
import { encodeSpaces, getHeaders } from "../../helpers/helperWebAPI"
import { Search, SearchNextItems, SearchResult } from "./types"
import qs from 'query-string'

const searchItem: Search = async (accessToken, query, type, configs) => {
    query = encodeSpaces(query)
    let data: SearchResult = {}
    try{
        const queryParameters = qs.stringify(configs || {})
        const response = await api.spotify.get<SearchResult>(`/search?q=${query}&type=${type}${queryParameters}`, {...getHeaders(accessToken)})
        data = response.data
    }finally{
        return data
    }
}

export default searchItem

export const searchNextItems: SearchNextItems = async (accessToken, nextURL, configs) => {
    let data: SearchResult = {}
    try{
        let [url, defaultParameters] = nextURL.split('?')
        const queryParameters = qs.stringify({...qs.parse(defaultParameters), ...configs} || {})
        const response = await api.spotify.get<SearchResult>(`${url}?${queryParameters}`, {...getHeaders(accessToken)})
        data = response.data
    }finally{
        return data
    }
}