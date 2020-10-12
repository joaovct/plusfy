import { getPlayer, getPlayerDevice } from "../api/webapi/player"
import { Iplayer } from "../api/webapi/types"
import { PLAYER, Iplayer_action, PLAYER_REQUESTED, PLAYER_ERROR, PLAYER_SUCCESS } from "../store/player/types"
import { setPlayer as setPlayerAtWebApi } from '../api/webapi/player'

const playerAction = (accessToken: string) => {

    return async (dispatch: Function) => {
        let actionReturn: Iplayer_action = {type: PLAYER, status: PLAYER_REQUESTED}

        const resPlayer = await getPlayer({accessToken})
        if(resPlayer){
            const resPlayerDevice = await getPlayerDevice({accessToken})
            if(resPlayerDevice){
                const payload = manageActiveDevice({...resPlayer.data, ...resPlayerDevice.data})
                actionReturn = {type: PLAYER, status: PLAYER_SUCCESS, payload}
            }else{
                actionReturn = {type: PLAYER, status: PLAYER_ERROR, payload: undefined}
            }
        }else{
            actionReturn = {type: PLAYER, status: PLAYER_ERROR, payload: undefined}

        }

        setPlayerAtWebApi(actionReturn.payload)
        dispatch(actionReturn)
     }
}

export default playerAction

function manageActiveDevice(payload: Iplayer){
    if(!payload.device && payload.devices)
        payload.device = payload.devices[0]
    return payload
}