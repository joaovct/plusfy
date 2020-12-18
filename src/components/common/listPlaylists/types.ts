import { Playlist } from "../../../common/api/webapi/types";

export interface ListPlaylistsProps{
    playlists: Playlist[]
    actionOnClick?: 'redirect' | ((playlist: Playlist) => void)
}