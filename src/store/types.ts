import {Iuser} from './user/types'
import {Itoken} from './token/types'

export interface Istore{
    user: Iuser
    token: Itoken
}