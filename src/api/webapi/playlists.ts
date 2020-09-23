import qs from 'query-string'
import api from '../api'
import {IUserPlaylists, Iplaylist, IplaylistTracks} from './types'

export const fetchUserPlaylists = async (accessToken: string) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    const body = qs.stringify({limit: 50})
    let items: Array<Iplaylist> = []
    let status = 'empty'

    try{
        const response = await api.spotify.get<IUserPlaylists>(`/me/playlists?${body}`, headers)
        items = response.data.items
        status = 'success'

        let urlNext = response.data.next
        while(urlNext){
            let data
            try{
                const resLoop = await api.spotify.get<IUserPlaylists>(urlNext, headers)
                data = resLoop.data
                urlNext = data.next
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
        const res = await api.spotify.get<Iplaylist>(`/playlists/${id}`, headers)
        data = {...res.data}

        let urlNext = data.tracks.next
        while(urlNext){
            let dataLoop
            try{
                const resLoop = await api.spotify.get<IplaylistTracks>(urlNext, headers)
                dataLoop = resLoop.data
                urlNext = dataLoop.next
            }finally{
                data.tracks.items = data.tracks.items.concat( dataLoop?.items || [] )
            }
        }


    }catch(e){
        console.error(e)
    }finally{
        return data
    }
}