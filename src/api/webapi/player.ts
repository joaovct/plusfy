import api from "../api"
import {Iplayer, IplayerDevice} from '../webapi/types'

let player: Iplayer

export const setPlayer = (currentPlayer?: Iplayer) => currentPlayer ? player = currentPlayer : null

const getDeviceId = (deviceId?: string) => deviceId ? `?device_id=${deviceId}` : player.device ? `?device_id=${player.device.id}` : '' 

interface IplayTrack{
    accessToken: string,
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

interface IgetPlayer{
    accessToken: string
}

export const getPlayer = async ({accessToken}: IgetPlayer) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    const response = await api.spotify.get<Iplayer>('/me/player', headers)
    return response
}

interface IgetPlayerDevice extends IgetPlayer{}

export const getPlayerDevice = async ({accessToken}: IgetPlayerDevice) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    const response = await api.spotify.get<IplayerDevice>('/me/player/devices', headers)
    return response
}

interface ItransferPlayback{
    accessToken: string
    deviceIds: {
        device_ids: Array<string>
    }
}

export const transferPlayback = async ({accessToken, deviceIds}: ItransferPlayback) => {
    const headers = {headers: { 'Authorization': `Bearer ${accessToken}`}}
    const body = {device_ids: deviceIds}
    await api.spotify.put('/me/player', body, headers)
}