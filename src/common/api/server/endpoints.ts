import api from "../api";
import { FindTrack, FindTrackResponse } from "./types";

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