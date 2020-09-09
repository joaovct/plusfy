export interface IresponseUserPlaylists{
    items: Array<IplaylistItem>
    limit: number
    next?: string
    offset: number
    previous?: string
    total: number
}

export interface IplaylistItem{
    collaborative: boolean
    description: string
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    images: Array<Iimage>
    name: string
    public?: boolean
    snapshot_id: string
    type: string
    uri: string
    owner: Iuser
}

export interface IresponsePlaylist{
    collaborative: boolean
    description: string
    external_urls: {
        spotify: string
    }
    followers: {
        href: string
        total: number
    }
    href: string
    id: string
    images: Array<Iimage>
    name: string
    owner: Iuser
    public: boolean
    snapshot_id: string
    tracks: Array<IplaylistTrack>
}

export interface IplaylistTrack{
    added_at: Date
    added_by: Iuser
    is_local: boolean
    track: Itrack
}

export interface Itrack{
    album: Ialbum
    artists: Array<Iartist>
    available_markets: Array<string>
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_urls: {
        spotify: string
    } 
    href: string
    id: string
    is_playlable: string
    name: string
    popularity: number
    preview_url?: string
    track_number: number
    type: string
    uri: string
    is_local: boolean
}

export interface Iartist{
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    name: string
    type: string
    uri: string
}

export interface Ialbum{
    album_group?: string
    album_type: string
    artists: {
        external_urls: {
            spotify: string
        }
        href: string
        id: string
        name: string
        type: string
        uri: string
    }
    available_markets: Array<string>
    external_urls:{
        spotify: string
    } 
    href: string
    id: string
    images: Array<Iimage>
    name: string
    release_date: string
    release_date_precision: string
    type: string
    uri: string
}

export interface Iuser{
    display_name?: string
    externals_urls: {spotify: string}
    followers: {}
    href: string
    id: string
    images: Array<Iimage>
    type: string
    uri: string
}

export interface Iimage{
    height: number
    width: number
    url: string
}