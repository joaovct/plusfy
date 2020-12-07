import React, { memo, useContext } from 'react'
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
import ContextListTracks from '../ContextListTracks'
import { isTrackDisabled } from '../../../../common/api/disabledTracks/disabledTracks'
import { IUser } from '../../../../redux/store/user/types'

interface TrackProps{
    track: Track
    index: number
    additionalColumns?: string | JSX.Element 
}

const TrackRow: React.FC<TrackProps> = ({track, index}) => {
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const {id: userId} = useSelector<IStore, IUser>(store => store.user)
    const {additionalColumns, contextUri} = useContext(ContextListTracks)
    const isDisabled = isTrackDisabled({userId, trackURI: track.uri, playlistURI: contextUri || ''})

    const handleToggleTrack = () => {
        const uri = track.uri || ''
        const action = toggleTrack(currentState, uri)
        if(action === 'PLAY')
            if(contextUri)
                playTrack({accessToken,contextUri, offset: {uri: uri}})
            else
                playTrack({accessToken,contextUri, uris: [uri]})
        else if(action === 'PAUSE')
            pausePlayer({accessToken})
        else if(action === 'RESUME')
            resumePlayer({accessToken}) 
    }

    return(
        <PlaylistTableRow uri={track.uri} playingUri={currentState?.item?.uri} disabled={isDisabled}>
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
            {
                additionalColumns ?
                    additionalColumns.map((column, index) => (
                        <div key={`trackrowcolumnbody-${index}`}>
                            {column.bodyContent[index] || ''}
                        </div>
                    ))
                : <></>
            }
            <div>
                <TrackRowOptions
                    track={track}
                    index={index}
                />
            </div>
        </PlaylistTableRow>
    )
}

export default memo(TrackRow)