import api from "../api"
import {Iplayer, IplayerDevice} from '../webapi/types'

let player: Iplayer

export const setPlayer = (currentPlayer?: Iplayer) => currentPlayer ? player = currentPlayer : null

const getDeviceId = (deviceId?: string) => deviceId ? `?device_id=${deviceId}` : player.device ? `?device_id=${player.device.id}` : '' 

interface IplayerRequest{
    accessToken?: string
}

interface IplayTrack extends IplayerRequest{
    contextUri?: string
    uris?: Array<string>
    offset?: {
        position?: number
        uri?: string
    }
    deviceId?: string
}

export const playTrack = async ({accessToken, contextUri, uris, offset, deviceId}: IplayTrack) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    const body = {uris, context_uri: contextUri, offset}

    await api.spotify.put(`/me/player/play${getDeviceId(deviceId)}`, body, headers)
}

export const getPlayer = async ({accessToken}: IplayerRequest) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    try{
        const response = await api.spotify.get<Iplayer>('/me/player', headers)
        return response
    }catch{
        return null
    }
}

export const getPlayerDevice = async ({accessToken}: IplayerRequest) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    try{
        const response = await api.spotify.get<IplayerDevice>('/me/player/devices', headers)
        return response
    }catch{
        return null
    }
}

interface ItransferPlayback{
    accessToken: string
    deviceIds: {
        device_ids: Array<string>
    }
}

export const transferPlayback = async ({accessToken, deviceIds}: ItransferPlayback) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    const body = {device_ids: deviceIds}
    await api.spotify.put('/me/player', body, headers)
}

export const playPlayer = async ({accessToken}: IplayerRequest) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    try{
        await api.spotify.put('/me/player/play', {}, headers)
    }finally{
        return null
    }
}

export const pausePlayer = async ({accessToken} : IplayerRequest) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    try{
        await api.spotify.put('/me/player/pause', {}, headers)
    }finally{
        return null
    }
}

export const previousPlayer = async ({accessToken}: IplayerRequest) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    try{
        await api.spotify.post('/me/player/previous', {}, headers)
    }finally{
        return null
    }
}

export const nextPlayer = async ({accessToken}: IplayerRequest) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    try{
        await api.spotify.post('/me/player/next', {}, headers)
    }finally{
        return null
    }
}