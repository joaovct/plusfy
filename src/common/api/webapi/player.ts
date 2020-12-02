import api from "../api"
import {IPlayer, IPlayerDevice} from './types'
import qs from 'query-string'
import { defineActiveDevice } from "../../helpers/helperWebAPI"

interface IplayerRequest{
    accessToken?: string
}

export const getDevices = async({accessToken}: IplayerRequest) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    let response = null
    try{
        response = await api.spotify.get<{devices: Array<IPlayerDevice>}>('/me/player/devices', headers)
    }finally{
        return response
    }
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
    const device = defineActiveDevice((await getDevices({accessToken}))?.data.devices)
    
    try{
        await api.spotify.put(`/me/player/play?device_id=${deviceId || device?.id}`, body, headers)
    }finally{
        return null
    }
}

export const getPlayer = async ({accessToken}: IplayerRequest) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    try{
        const response = await api.spotify.get<IPlayer>('/me/player', headers)
        return response
    }catch{
        return null
    }
}

export const getPlayerDevice = async ({accessToken}: IplayerRequest) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    try{
        const response = await api.spotify.get<IPlayerDevice>('/me/player/devices', headers)
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

interface IshufflePlayer extends IplayerRequest{
    shuffle: boolean
}

export const shufflePlayer = async({accessToken, shuffle}: IshufflePlayer) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    try{
        const queryParam = qs.stringify({state: shuffle})
        await api.spotify.put(`/me/player/shuffle?${queryParam}`, {}, headers)
    }finally{
        return null
    }
}

interface IrepeatPlayer extends IplayerRequest{
    state: string
}

export const repeatPlayer = async({accessToken, state}: IrepeatPlayer) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    try{
        const queryParam = qs.stringify({state})
        await api.spotify.put(`/me/player/repeat?${queryParam}`, {}, headers)
    }finally{
        return null
    }
}

export const resumePlayer = async ({accessToken}: IplayerRequest) => {
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

interface IaddToQueue extends IplayerRequest{
    uri: string
}

export const addToQueue = async ({accessToken, uri}: IaddToQueue) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    let response = null
    try{
        const queryParam = qs.stringify({uri})
        response = await api.spotify.post(`/me/player/queue?${queryParam}`, {}, headers)
    }finally{
        return response
    }
}