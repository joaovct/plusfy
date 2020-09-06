export const TOKEN = 'TOKEN'

export interface Itoken_action{
    type: string,
    payload: {
        accessToken: string,
        refreshToken: string,
    }
}

export interface Itoken{
    accessToken: string
    refreshToken: string
}