import { Iplayer } from "../../api/webapi/types";

export const CURRENT_STATE = 'CURRENT_STATE'

export interface IcurrentState_action{
    type: string
    payload: Iplayer
}

export interface IcurrentState extends Iplayer{}