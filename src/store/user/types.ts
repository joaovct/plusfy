export const USER = 'USER'
export const USER_REQUESTED = 'USER_REQUESTED'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_ERROR = 'USER_ERROR'

export interface IUSER{
    type: string
    status: string
    payload?: {}
}