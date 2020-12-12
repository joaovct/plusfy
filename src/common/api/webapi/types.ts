export interface IWebAPIRequest{
    accessToken: string
}

export interface Playlists{
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
    images: Array<Image>
    name: string
    owner: IUser
    public: boolean
    snapshot_id: string
    tracks: PlaylistTracks
    uri: string
}

export interface PlaylistTracks{
    href: string
    limit: number,
    next?: string
    previous?: string
    offset: number
    total: number
    items: Array<PlaylistTrack>
}

export interface PlaylistTrack{
    added_at: string
    added_by: IUser
    is_local: boolean
    track: Track
}

export interface Tracks{
    href: string
    limit: number,
    next?: string
    previous?: string
    offset: number
    total: number
    items: Array<Track>
}

export interface Track{
    album: IAlbum
    artists: Array<Artist>
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

export interface SavedTracks{
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
    track: Track
}

export interface Artists{
    href: string
    items: Array<Artist>
    limit: number
    next: string | null
    offset: number
    previous: string | null
    total: number
}

export interface Artist{
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    name: string
    type: string
    uri: string
    popularity: number
    genres: string[]
    images: Image[]
}

export interface Albums{
    href: string
    items: Array<IAlbum>
    limit: 20
    next: string | null
    offset: number
    previous: string | null
    total: number
}

export interface IAlbum{
    album_group?: string
    album_type: string
    artists: Array<Artist>
    available_markets: Array<string>
    external_urls:{
        spotify: string
    } 
    href: string
    id: string
    images: Array<Image>
    name: string
    release_date: string
    release_date_precision: string
    type: string
    uri: string
}

interface Shows{
    href: string
    items: Array<Show>
    limit: number
    next: string | null
    offset: number
    previous: string | null 
    total: number
}

export interface Show{
    available_markets: Array<string>
    copyrights: Array<{text: string, type: string}>
    description: string
    explicit: boolean
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    images: Array<Image>
    is_externally_hosted: boolean
    languages: Array<string>
    media_type: string
    name: string
    publisher: string
    type: 'show'
    uri: string
}

export interface Episodes{
    href: string
    items: Array<Episode>
    limit: number
    next: string | null
    offset: number
    previous: string | null 
    total: number
}

export interface Episode{
    audio_preview_url: string
    description: string
    duration_ms: number
    explicit: boolean
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    images: Array<Image>
    is_externally_hosted: boolean
    is_playable: boolean
    languages: Array<string>
    name: string
    release_date: string
    release_date_precision: string
    type: "episode"
    uri: string
}

export interface IUser{
    display_name?: string
    externals_urls: {spotify: string}
    followers: {}
    href: string
    id: string
    images: Array<Image>
    type: string
    uri: string
}

export interface Image{
    height: number
    width: number
    url: string
}

export interface IPlayer{
    timestamp?: number
    progress_ms?: number | null
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
    item?: Track
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


export type SearchTypes = 'album' | 'artist' | 'playlist' | 'track' | 'show' | 'episode'
type SearchConfigs = {market?: string, limit?: number, offset?: number, include_external?: 'audio'}

export type SearchResult = {
    [key: string]: Albums | Tracks | Playlists | Artists | Shows | Episodes | undefined
    albums?: Albums
    tracks?: Tracks
    playlists?: Playlists
    artists?: Artists
    shows?: Shows
    episodes?: Episodes
}

export type Search = (accessToken: string, query: string, type: SearchTypes, configs?: SearchConfigs) => Promise<SearchResult>

export type SearchNextItems = (accessToken: string, nextURL: string, configs?: SearchConfigs) => Promise<SearchResult>

export type UserTopArtistsAndTracksTimeRange = 'long_term' | 'medium_term' | 'short_term'
export type UserTopArtistsAndTracksType = 'artists' | 'tracks'

export type UserTopArtistsAndTracksConfigs = {
    [key: string]: number | UserTopArtistsAndTracksTimeRange | undefined
    limit?: number,
    offset?: number,
    time_range?: UserTopArtistsAndTracksTimeRange
}

export type GetUserTopArtistsAndTracksResult<T> = {
    (arg: Track | Artist): T
    total: number
    limit: number
    offset: number
    previous: string | null
    href: string
    next: string | null
    items: T[]
}

export interface GetUserTopArtistsAndTracks{
    <T>(accessToken: string, type: UserTopArtistsAndTracksType, configs?: UserTopArtistsAndTracksConfigs): Promise<GetUserTopArtistsAndTracksResult<T>>
}

export interface GetNextUserTopArtistsAndTracks{
    <T>(accessToken: string, nextURL: string, configs?: UserTopArtistsAndTracksConfigs): Promise<GetUserTopArtistsAndTracksResult<T>>
}