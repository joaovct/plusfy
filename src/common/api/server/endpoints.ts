import api from "../api";
import { GetNewAccessToken, GetNewAccessTokenResponse, FindTrack, FindTrackResponse } from "./types";
import qs from 'query-string'

export const getNewAccessToken: GetNewAccessToken = async (refreshToken) => {
    const queryParams = qs.stringify({refresh_token: refreshToken})
    const response = await api.server.get<GetNewAccessTokenResponse>(`/refresh_token?${queryParams}`)
    return response.data || {access_token: ''}
}

export const findTrack: FindTrack = (files, callback) => {
    const formData = new FormData() 
    
    const appendBlob = ((file: File, callback: () => void) => {
        const reader = new FileReader()
        reader.onload = e => {
            if(e?.target?.result){
                const extension = file.name.substring(file.name.lastIndexOf('.'), file.name.length)
                formData.append(file.name, new Blob([e.target.result], {type: `audio/${extension}`}))
                callback()
            }
        }
        reader.readAsArrayBuffer(file)
    })

    const readers = files.map(file => new Promise(resolve => appendBlob(file, resolve)))

    Promise.all(readers).then(async () => {
        let response: FindTrackResponse = {results: []}

        try{
            response = (await api.server.post<FindTrackResponse>('/find-track', formData, {headers: {'Content-Type': 'multipart/form-data'}})).data
        }catch(err){
            console.log(err)
        }finally{
            callback(response.results)
        }
    }).catch(err => console.log(err))
}