import {IUser} from './user/types'
import {IToken} from './token/types'
import { IPlayer } from '../../common/api/webapi/types'
import { ISpotifyPlayer } from './spotifyPlayer/types'
import { IDisabledTracks } from '../../common/api/disabledTracks/types'
import { ICurrentState } from './currentState/types'
import { ProgressMs } from './progressMs/types'

export interface IStore{
    user: IUser
    token: IToken
    player: IPlayer
    currentState: ICurrentState
    progressMs: ProgressMs
    spotifyPlayer: ISpotifyPlayer
    disabledTracks: IDisabledTracks
}