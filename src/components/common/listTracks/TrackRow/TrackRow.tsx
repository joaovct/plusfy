import React, { memo, useContext } from 'react'
import { useSelector } from 'react-redux'
import { Track } from '../../../../common/api/webapi/types'
import { formatArtistName, formatDuration, formatTrackPhoto, toggleTrack } from '../../../../common/helpers/helperPlaylist'
import { ICurrentState } from '../../../../redux/store/currentState/types'
import { IStore } from '../../../../redux/store/types'
import { breakpoints, PlaylistTableRow } from '../../../../styles/style'
import { pausePlayer, playPlayer, resumePlayer } from '../../../../common/api/webapi/player'
import { IToken } from '../../../../redux/store/token/types'
import {Pause, Play} from 'react-feather'
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
    const {tracks, additionalColumns, contextUri: playlistURI, viewMode, continuousPlayback} = useContext(ContextListTracks)
    const isDisabled = isTrackDisabled({userId, playlistURI: playlistURI || '', tracks: [{uri: track?.uri || ''}]})[0]

    const handleToggleTrack = () => {
        const uri = track?.uri || ''
        const action = toggleTrack(currentState, uri)

        if(action === 'PLAY'){
            if(playlistURI){
                playPlayer({accessToken, contextUri: playlistURI, offset: {uri: uri}})
            }else if(!playlistURI && continuousPlayback){
                const uris: string[] = tracks.map(track => track?.uri || '')
                playPlayer({accessToken, uris, offset: {uri: uri}})
            }else{
                playPlayer({accessToken, contextUri: playlistURI, uris: [uri]})
            }
        }else if(action === 'PAUSE'){
            pausePlayer({accessToken})
        }else{
            resumePlayer({accessToken}) 
        }
    }

    const handleClickOnSecondColumn = () => {
        if(viewMode === 'simplified' || window.innerWidth <= breakpoints.absoluteDimensions.tbp)
            handleToggleTrack()
    }

    return(
        <PlaylistTableRow
            uri={track?.uri || ''}
            playingUri={currentState?.item?.uri}
            disabled={isDisabled}
            viewMode={viewMode}
        >
            <div onClick={handleToggleTrack}>
                <span>{index + 1}</span>
                {
                    toggleTrack(currentState, track?.uri || '') === 'PAUSE'
                    ? <Pause/>
                    : <Play/>
                }
            </div>
            <div onClick={handleClickOnSecondColumn}>
                <img loading="lazy" src={formatTrackPhoto(track)} alt={`Album ${track?.name}`} />
                <span>
                    <strong>{track?.name}</strong>
                    <small>{formatArtistName(track)}</small>
                </span>
            </div>
            <div>
                {track?.album.name}
            </div>
            {
                additionalColumns?.map((column, index) => (
                    <div key={`trackrowcolumnbody-${index}`}>
                        {column.bodyContent[index] || ''}
                    </div>
                ))
            }
            <div>
                {formatDuration(track?.duration_ms || 0)}
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

export default memo(TrackRow)