import { nextPlayer } from "./player";
import { IPlayerDevice, IPlaylist } from "./types";

export const getHeaders = (accessToken: string) => {
    return {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
}

export const defineActiveDevice = (devices?: Array<IPlayerDevice>): IPlayerDevice | null => (
    devices ? devices.find(device => device.is_active) || devices[0] : null
)

let lastUri = ''

export const preventDoubleNextPlayer = (uri: string, accessToken: string) => {
    if(uri !== lastUri){
        nextPlayer({accessToken})
        lastUri = uri
    }
}

export const encodeSpaces = (string: string) => string.replace(' ', '%20')