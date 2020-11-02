export const TOKEN = 'TOKEN'

export interface IToken_action{
    type: string,
    payload: IToken
}

export interface IToken{
    accessToken: string
    refreshToken: string
}