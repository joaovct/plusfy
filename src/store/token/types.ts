export const TOKEN = 'TOKEN'

export interface Itoken_action{
    type: string,
    payload: Itoken
}

export interface Itoken{
    accessToken: string
    refreshToken: string
}