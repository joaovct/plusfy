import api from "../api"

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
    const isDeviceIdValid = () => deviceId ? `?device_id=${deviceId}` : ''

    await api.spotify.put(`/me/player/play${isDeviceIdValid()}`, body, headers)
}