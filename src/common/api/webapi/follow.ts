import { getHeaders } from "../../helpers/helperWebAPI";
import api from "../api";

interface FollowPlaylist{
    (accessToken: string, {playlistId, isPublic}: {playlistId: string, isPublic: boolean}): Promise<number | null>
}

export const followPlaylist: FollowPlaylist = async (accessToken, {playlistId, isPublic}) => {
    let status = null
    try{
        const res = await api.spotify.put(`/playlists/${playlistId}/followers`, {public: isPublic}, {...getHeaders(accessToken)})
        status = res.status
    }finally{
        return status
    }
}

interface UnfollowPlaylist{
    (accessToken: string, {playlistId}: {playlistId: string}): Promise<number | null>
}

export const unfollowPlaylist: UnfollowPlaylist = async (accessToken, {playlistId}) => {
    let status = null
    try{
        const res = await api.spotify.delete(`/playlists/${playlistId}/followers`, {...getHeaders(accessToken)})
        status = res.status
    }finally{
        return status
    }
}

interface CheckUserFollowPlaylist{
    (accessToken: string, {playlistId, usersId}: {playlistId: string, usersId: string[]}): Promise<boolean[]>
}

export const checkUserFollowPlaylist: CheckUserFollowPlaylist = async (accessToken, {playlistId, usersId}) => {
    let response: boolean[] = []
    try{
        const res = await api.spotify.get<boolean[]>(`/playlists/${playlistId}/followers/contains?ids=${usersId.toString()}`, {...getHeaders(accessToken)})
        response = res.data
    }finally{
        return response
    }
}