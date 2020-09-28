import { Iplayer } from "../../api/webapi/types"

export const PLAYER = 'PLAYER'
export const PLAYER_REQUESTED = 'PLAYER_REQUESTED'
export const PLAYER_ERROR = 'PLAYER_ERROR'
export const PLAYER_SUCCESS = 'PLAYER_SUCCESS'

export interface Iplayer_action{
    type: string
    status: string
    payload?: Iplayer
}