import qs from 'query-string'
import api from '../api'
import {IresponseUserPlaylists, IresponsePlaylist, IplaylistItem} from './types'

export const fetchUserPlaylists = async (accessToken: string) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    const body = qs.stringify({limit: 50})
    let items: Array<IplaylistItem> = []
    let status = 'empty'

    try{
        const response = await api.spotify.get<IresponseUserPlaylists>(`/me/playlists?${body}`, headers)
        items = response.data.items
        status = 'success'

        let hasNext = response.data.next ? true : false
        while(hasNext){
            let data
            try{
                const responseLoop = await api.spotify.get<IresponseUserPlaylists>(response.data.next ? response.data.next : '', headers)
                data = responseLoop.data
                hasNext = data.next ? true : false
            }finally{
                items = items.concat(data?.items || [])
            }
        }
    }catch{
        status = 'fail'
    }finally{
        return {items, status}
    }
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

export const formatAddedAt = (trackAddedAt: string) => {
    const date = new Date(trackAddedAt)
    return date.toLocaleDateString('pt-br', {month: 'short', day: '2-digit', year: '2-digit'})
}

export const formatDuration = (duration: number) => {
    const totalSeconds = Math.floor( duration / 1000 )
    let seconds = (Math.floor( totalSeconds % 60 )).toString()
    let minutes = (Math.floor( totalSeconds / 60 )).toString()
    let hours = Math.floor( totalSeconds / 3600 )

    if(seconds === '0') seconds = '00'
    if(minutes === '0') minutes = '00'

    return `${hours ? `${hours}:` : ''}${minutes}:${seconds}` 
}