import {Iuser} from './user/types'
import {Itoken} from './token/types'
import { Iplayer } from '../api/webapi/types'
import { IspotifyPlayer } from './spotifyPlayer/types'
import { IdisabledTracks } from '../api/disabledTracks/types'
import { IcurrentState } from './currentState/types'

export interface Istore{
    user: Iuser
    token: Itoken
    player: Iplayer
    currentState: IcurrentState
    spotifyPlayer: IspotifyPlayer
    disabledTracks: IdisabledTracks
}