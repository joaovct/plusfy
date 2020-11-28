import api from "../api"
import { encodeSpaces, getHeaders } from "../../helpers/helperWebAPI"
import { Search } from "./types"

const searchItem: Search = async (accessToken, query, type, configs) => {
    query = encodeSpaces(query)
    let data = {}
    try{
        const response = await api.spotify.get(`/search?q=${query}&type=${type}`, {params: configs, ...getHeaders(accessToken)})
        data = response.data
    }finally{
        return data
    }
}

export default searchItem