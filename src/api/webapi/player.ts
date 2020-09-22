import api from "../api"

interface IplayTrack{
    accessToken: string,
    uris: Array<string>,
    deviceId?: string
}

export const playTrack = async ({accessToken, uris, deviceId}: IplayTrack) => {
    const headers = {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
    const body = {uris}
    const isDeviceIdValid = () => deviceId ? `?device_id=${deviceId}` : ''

    await api.spotify.put(`/me/player/play${isDeviceIdValid()}`, body, headers)
}