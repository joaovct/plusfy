import qs from 'query-string'
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

interface ConfigAddItemsToPlaylist{
    playlistId: string
    uris: Array<string>
    position?: number
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
    let res
    try{
        const data = {uris: configs.uris, position: configs.position}
        res = await api.spotify.post(`/playlists/${configs.playlistId}/tracks`, data, headers)
    }finally{
        return res?.data || null
    }
}