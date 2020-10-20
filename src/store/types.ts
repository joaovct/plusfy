import {IUser} from './user/types'
import {IToken} from './token/types'
import { IPlayer } from '../api/webapi/types'
import { ISpotifyPlayer } from './spotifyPlayer/types'
import { IDisabledTracks } from '../api/disabledTracks/types'
import { ICurrentState } from './currentState/types'

export interface IStore{
    user: IUser
    token: IToken
    player: IPlayer
    currentState: ICurrentState
    spotifyPlayer: ISpotifyPlayer
    disabledTracks: IDisabledTracks
}