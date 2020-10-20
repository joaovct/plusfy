import { nextPlayer } from "./player";
import { IPlayerDevice } from "./types";

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