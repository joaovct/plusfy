import React from 'react'
import { useSelector } from 'react-redux'
import { Track } from '../../../../common/api/webapi/types'
import { formatArtistName, formatDuration, toggleTrack } from '../../../../common/helpers/helperPlaylistTable'
import { ICurrentState } from '../../../../redux/store/currentState/types'
import { IStore } from '../../../../redux/store/types'
import { PlaylistTableRow } from '../../../../styles/style'
import { pausePlayer, playTrack, resumePlayer } from '../../../../common/api/webapi/player'
import { IToken } from '../../../../redux/store/token/types'
import {Pause, Play} from 'react-feather'
import emptyAlbumPhoto from '../../../../assets/empty-playlist-photo.svg'
import TrackRowOptions from './TrackRowOptions'

interface TrackProps{
    track: Track
    index: number
}

const TrackRow: React.FC<TrackProps> = ({track, index}) => {
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)

    const handleToggleTrack = () => {
        const uri = track.uri || ''
        const action = toggleTrack(currentState, uri)
        if(action === 'PLAY')
            playTrack({accessToken,uris: [uri]})
        else if(action === 'PAUSE')
            pausePlayer({accessToken})
        else if(action === 'RESUME')
            resumePlayer({accessToken}) 
    }

    return(
        <PlaylistTableRow uri={track.uri} playingUri={currentState?.item?.uri}>
            <div onClick={handleToggleTrack}>
                <span>{index + 1}</span>
                {
                    toggleTrack(currentState, track?.uri || '') === 'PAUSE'
                    ? <Pause/>
                    : <Play/>
                }
            </div>
            <div>
                <img src={track.album.images[0]?.url || emptyAlbumPhoto} alt={`Album ${track.name}`} />
                <span>{track.name}</span>
            </div>
            <div>
                {formatArtistName(track)}
            </div>
            <div>
                {track.album.name}
            </div>
            <div>
                {formatDuration(track.duration_ms)}
            </div>
            <div>
                <TrackRowOptions
                    track={track}
                    index={index}
                />
            </div>
        </PlaylistTableRow>
    )
}

export default TrackRow