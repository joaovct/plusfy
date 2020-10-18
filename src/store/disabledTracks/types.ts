import { IdisabledTracks } from "../../api/disabledTracks/types";

export const DISABLED_TRACKS = 'DISABLED_TRACKS'

export interface IdisabledTracks_action{
    type: string
    payload: IdisabledTracks
}