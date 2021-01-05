export interface DisabledStorage{
    playlists: DisabledPlaylist[]
}

export interface DisabledPlaylist{
    uri: string
    tracks: DisabledTrack[]
}

export interface DisabledTrack{
    uri: string
}