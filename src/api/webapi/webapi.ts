import qs from 'query-string'
import api from '../api'
import {IresponseUserPlaylists, IresponsePlaylist} from './types'

export const fetchUserPlaylists = async (accessToken: string) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    const body = qs.stringify({limit: 50})
    const res = await api.spotify.get<IresponseUserPlaylists>(`/me/playlists?${body}`, headers)
    let items = res.data.items

    let hasNext = res.data.next ? true : false
    while(hasNext){
        const {data} = await api.spotify.get<IresponseUserPlaylists>(res.data.next ? res.data.next : '', headers)
        hasNext = data.next ? true : false
        items = items.concat(data.items)
    }

    return items
}

export const fetchPlaylist = async (accessToken: string, id: string) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    let data
    try{
        const res = await api.spotify.get<IresponsePlaylist>(`/playlists/${id}`, headers)
        data = {...res.data}
    }catch(e){
        console.error(e)
    }finally{
        return data
    }
}