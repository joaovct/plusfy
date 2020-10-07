import { getPlayer, getPlayerDevice } from "../api/webapi/player"
import { Iplayer } from "../api/webapi/types"
import { PLAYER, Iplayer_action, PLAYER_REQUESTED, PLAYER_ERROR, PLAYER_SUCCESS } from "../store/player/types"
import { setPlayer as setPlayerAtWebApi } from '../api/webapi/player'

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
            setPlayerAtWebApi(actionReturn.payload)
            dispatch(actionReturn)
        }
    }
}

export default playerAction

function manageActiveDevice(payload: Iplayer){
    if(!payload.device)
        payload.device = payload.devices[0]
    return payload
}