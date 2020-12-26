import { getHeaders } from '../../helpers/helperWebAPI'
import api from '../api'
import { SavedTracks } from './types'

interface ILibraryRequest{
    accessToken: string 
}

interface ISaveToLibrary extends ILibraryRequest{
    ids: Array<string>
}

export const getSavedTracks = async ({accessToken}: ILibraryRequest) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    let data = null
    try{
        const res = await api.spotify.get<SavedTracks>('/me/tracks', headers)
        data = res.data

        let urlNext = data.next
        while(urlNext){
            let dataLoop
            try{
                const resLoop = await api.spotify.get<SavedTracks>(urlNext, headers)
                dataLoop = resLoop.data
                urlNext = dataLoop.next
            }finally{
                data.items = data.items.concat( dataLoop?.items || [] )
            }
        }
    }finally{
        return data
    }
}

interface CheckSavedTracks extends ILibraryRequest{
    ids: string[]
}

export const checkSavedTracks = async ({accessToken, ids}: CheckSavedTracks) => {
    let data: Boolean[] = []
    try{
        const res = await api.spotify.get<Boolean[]>(`/me/tracks/contains?ids=${ids.toString()}`, {...getHeaders(accessToken)})
        data = res.data
    }finally{
        return data
    }
}


export const saveTrack = async ({accessToken, ids}: ISaveToLibrary) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    let res
    try{
        res = await api.spotify.put(`/me/tracks`, {ids}, headers)
    }finally{
        return res?.status || 400
    }
}

export const removeSavedTrack  = async ({accessToken, ids}: ISaveToLibrary) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    let res
    try{
        res = await api.spotify.delete(`/me/tracks?ids=${ids}`, headers)
    }finally{
        return res?.status || 400
    }
}