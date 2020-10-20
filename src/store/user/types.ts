export const USER = 'USER'
export const USER_LOGOFF = 'USER_LOGOFF'
export const USER_REQUESTED = 'USER_REQUESTED'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_ERROR = 'USER_ERROR'

export interface IUser_action{
    type: string
    status: string
    payload?: {}
}
export interface IUser{
    country: string
    display_name: string
    email: string
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean,
    }
    external_urls: {
        spotify: string
    }
    followers: {
        href: any
        total: number
    }
    href: string
    id: string
    images: IImages,
    product: string
    type: string
    uri: string
}

interface IImages{
    [index: number]: {url: string}
}