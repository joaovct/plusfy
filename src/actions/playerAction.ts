import { getPlayer, getPlayerDevice, transferPlayback } from "../api/webapi/player"
import { Iplayer, IplayerDevice } from "../api/webapi/types"
import { PLAYER, Iplayer_action, PLAYER_REQUESTED, PLAYER_ERROR, PLAYER_SUCCESS } from "../store/player/types"

const playerAction = (accessToken: string) => {

    return async (dispatch: Function) => {
        let actionReturn: Iplayer_action = {type: PLAYER, status: PLAYER_REQUESTED}

        try{
            const resPlayer = await getPlayer({accessToken})
            try{
                const resPlayerDevice = await getPlayerDevice({accessToken})
                const payload = manageActiveDevice({...resPlayer.data, ...resPlayerDevice.data})
                actionReturn = {type: PLAYER, status: PLAYER_SUCCESS, payload}
            }catch{
                actionReturn = {type: PLAYER, status: PLAYER_ERROR, payload: undefined}
            }

        }catch{
            actionReturn = {type: PLAYER, status: PLAYER_ERROR, payload: undefined}
        }finally{
            dispatch(actionReturn)
        }
    }
}

export default playerAction

function manageActiveDevice(payload: Iplayer){
    if(!payload.device.id)
        payload.device = {...payload.devices[0]}
    return payload
}

// async function activateSingleDevice(accessToken: string, actionReturn: Iplayer_action){
//     console.log(1)
//     console.log(actionReturn)
//     if(actionReturn.payload?.devices && actionReturn.payload.devices.length === 1){
//         await transferPlayback({accessToken, deviceIds: {device_ids: [actionReturn.payload.devices[0].id]}})
//         const responsePlayerDevice = await getPlayerDevice({accessToken})
//         return responsePlayerDevice
//     }
// }