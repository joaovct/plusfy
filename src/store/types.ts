import {Iuser} from './user/types'
import {Itoken} from './token/types'
import { Iplayer } from '../api/webapi/types'

export interface Istore{
    user: Iuser
    token: Itoken
    player: Iplayer
}