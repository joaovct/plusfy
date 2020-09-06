export const USER = 'USER'
export const USER_REQUESTED = 'USER_REQUESTED'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_ERROR = 'USER_ERROR'

export interface Iuser_action{
    type: string
    status: string
    payload?: {}
}
export interface Iuser{
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
    images: Iimages,
    product: string
    type: string
    uri: string
}

interface Iimages{
    [index: number]: {url: string}
}