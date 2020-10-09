import {Iuser} from './user/types'
import {Itoken} from './token/types'
import { Iplayer } from '../api/webapi/types'
import { IspotifyPlayer } from './spotifyPlayer/types'

export interface Istore{
    user: Iuser
    token: Itoken
    player: Iplayer
    spotifyPlayer: IspotifyPlayer
}