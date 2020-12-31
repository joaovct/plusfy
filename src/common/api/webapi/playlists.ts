import qs from 'query-string'
import { getHeaders } from '../../helpers/helperWebAPI'
import api from '../api'
import {Playlists, Playlist, PlaylistTracks} from './types'

export type Status = 'empty' | 'success' | 'fail'

export const fetchUserPlaylists = async (accessToken: string) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    const body = qs.stringify({limit: 50})
    let items: Array<Playlist> = []
    let status: Status = 'empty'

    try{
        const response = await api.spotify.get<Playlists>(`/me/playlists?${body}`, headers)
        items = response.data.items
        status = 'success'

        let urlNext = response.data.next
        while(urlNext){
            let data
            try{
                const resLoop = await api.spotify.get<Playlists>(urlNext, headers)
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

export const fetchPlaylist = async (accessToken: string, playlistId: string) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    let data = null
    try{
        const res = await api.spotify.get<Playlist>(`/playlists/${playlistId}`, headers)
        data = res.data

        let urlNext = data.tracks.next
        while(urlNext){
            let dataLoop
            try{
                const resLoop = await api.spotify.get<PlaylistTracks>(urlNext, headers)
                dataLoop = resLoop.data
                urlNext = dataLoop.next
            }finally{
                data.tracks.items = data.tracks.items.concat( dataLoop?.items || [] )
            }
        }
    }finally{
        return data
    }
}

interface ConfigsRemoveTracks{
    playlistId: string,
    tracks: Array<{
        uri: string,
        positions?: Array<number>
    }>,
}

export const removeTracksPlaylist = async (accessToken: string, configs: ConfigsRemoveTracks ) => {
    const headers = {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}
    let res
    try{
        res = await api.spotify.request({
            method: "DELETE",
            url: `/playlists/${configs.playlistId}/tracks`,
            headers,
            data: { tracks: configs.tracks }
        })
    }finally{
        return res?.status || 400
    }
}

interface AddItemsToPlaylist{
    (acessToken: string, configs: {
        playlistId: string
        uris: Array<string>
        position?: number
    }): Promise<{snapshot_id: string} | null>
}

export const addItemsToPlaylist: AddItemsToPlaylist = async (accessToken, configs) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    let response

    if(configs.uris){
        const limit = 100
        const nLoop = Math.ceil(configs.uris.length / limit)
      
        for(let i = 0; i < nLoop; i++){
            const uris = configs.uris.slice(limit * i, limit * (i + 1))
            
            const data = {uris: [...uris], position: configs.position}
            response = await api.spotify.post(`/playlists/${configs.playlistId}/tracks`, data, headers)
        }

        return response?.data || null
    }
    return null
}

interface CreatePlaylist{
    (accessToken: string, configs: {
        userId: string
        name: string
        public?: boolean
        collaborative?: boolean
        description?: string
    }): Promise<Playlist | null>
}

export const createPlaylist: CreatePlaylist = async (accessToken, configs) => {
    let response = null
    const {userId, ...body} = configs
    try{
        response = await api.spotify.post<Playlist>(`/users/${userId}/playlists`, body, {...getHeaders(accessToken)})
    }finally{
        return response?.data || null
    }
}