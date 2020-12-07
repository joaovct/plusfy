import { IPlayer } from "../../../common/api/webapi/types";

export const CURRENT_STATE = 'CURRENT_STATE'

export interface ICurrentState_action{
    type: string
    payload: ICurrentState
}

export interface ICurrentState extends Omit<IPlayer, 'progress_ms'>{}