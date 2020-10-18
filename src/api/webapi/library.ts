import api from '../api'

interface IlibraryRequest{
    accessToken: string 
}

interface IsaveToLibrary extends IlibraryRequest{
    ids: Array<string>
}

export const saveToLibrary = async ({accessToken, ids}: IsaveToLibrary) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    try{
        const body = {ids}
        console.log(body)
        await api.spotify.put(`/me/tracks`, body, headers)
    }finally{
        return null
    }
}