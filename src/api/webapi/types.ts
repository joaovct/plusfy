export interface IWebAPIRequest{
    accessToken: string
}

export interface IUserPlaylists{
    items: Array<IPlaylist>
    limit: number
    next?: string
    offset: number
    previous?: string
    total: number
}

export interface IPlaylist{
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
    owner: IUser
    public: boolean
    snapshot_id: string
    tracks: IPlaylistTracks
    uri: string
}

export interface IPlaylistTracks{
    href: string
    limit: number,
    next?: string
    previous?: string
    offset: number
    total: number
    items: Array<IPlaylistTrack>
}

export interface IPlaylistTrack{
    added_at: string
    added_by: IUser
    is_local: boolean
    track: ITrack
}

export interface ISavedTracks{
    href: string
    items: Array<ISavedTrack>
    limit: number
    next: string
    offset: number
    previous: string | null
    total: number
}

export interface ISavedTrack{
    added_at: string
    track: ITrack
}

export interface ITrack{
    album: IAlbum
    artists: Array<IArtist>
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

export interface IArtist{
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    name: string
    type: string
    uri: string
}

export interface IAlbum{
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

export interface IUser{
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

export interface IPlayer{
    timestamp?: number
    progress_ms?: boolean
    is_playing?: boolean
    currently_playing_type?: string
    actions?: {
        dissallows: {
            interrupting_playback?: boolean
            resuming?: boolean
            pausing?: boolean
            seeking?: boolean
            skipping_next?: boolean
            skipping_prev?: boolean
            toggling_repeat_context?: boolean
            toggling_shuffle?: boolean
            toggling_repeat_track?: boolean
            transferring_playback?: boolean
        }
    }
    item?: ITrack
    shuffle_state?: boolean
    repeat_state?: string
    context?: {
        external_urls: {
            spotify: string
        }
        href: string
        type: string
        uri: string
    }
    device?: IPlayerDevice
    devices?: Array<IPlayerDevice>
}

export interface IPlayerDevice{
    id: string
    is_active: boolean
    is_private_session: boolean
    is_restricted: boolean
    name: string
    type: string
    volume_percent: number
}