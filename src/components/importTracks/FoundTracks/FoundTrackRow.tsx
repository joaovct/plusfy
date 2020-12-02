import React from 'react'
import { Pause, Play } from 'react-feather'
import { useSelector } from 'react-redux'
import { formatArtistName, formatDuration, toggleTrack } from '../../../common/helpers/helperPlaylistTable'
import { ICurrentState } from '../../../redux/store/currentState/types'
import { IStore } from '../../../redux/store/types'
import { Button, PlaylistTableRow } from '../../../styles/style'
import emptyAlbumPhoto from '../../../assets/empty-playlist-photo.svg'
import { pausePlayer, playTrack, resumePlayer } from '../../../common/api/webapi/player'
import { IToken } from '../../../redux/store/token/types'
import {FoundTrack} from '../types'
import useAddToPlaylist from '../../../common/hooks/components/useAddToPlaylist'


interface FoundTrackProps{
    foundTrack: FoundTrack
    index: number
}

const FoundTrackRow: React.FC<FoundTrackProps> = ({foundTrack, index}) => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)
    const addToPlaylist = useAddToPlaylist()

    const handleToggleTrack = () => {
        const uri = foundTrack.track?.uri || ''
        const action = toggleTrack(currentState, uri)
        if(action === 'PLAY')
            playTrack({accessToken,uris: [uri]})
        else if(action === 'PAUSE')
            pausePlayer({accessToken})
        else if(action === 'RESUME')
            resumePlayer({accessToken}) 
    }

    const handleAddPlaylist = () => {
        if(foundTrack.track?.uri){
            addToPlaylist('track', [foundTrack.track.uri])
        }
    }

    return(
        <>
        {
            foundTrack.track ? 
            <PlaylistTableRow uri={foundTrack.track.uri} playingUri={currentState?.item?.uri}>
                <div onClick={handleToggleTrack}>
                    <span>{index + 1}</span>
                    {
                        toggleTrack(currentState, foundTrack.track?.uri || '') === 'PAUSE'
                        ? <Pause/>
                        : <Play/>
                    }
                </div>
                <div>
                    <img src={foundTrack.track.album.images[0]?.url || emptyAlbumPhoto} alt={`Album ${foundTrack.track.name}`} />
                    <span>{foundTrack.track.name}</span>
                </div>
                <div>
                    {formatArtistName(foundTrack.track)}
                </div>
                <div>
                    {foundTrack.track.album.name}
                </div>
                <div>
                    {foundTrack.file.fieldname}
                </div>
                <div>
                    {formatDuration(foundTrack.track.duration_ms)}
                </div>
                <div>
                    <Button onClick={handleAddPlaylist}>Add</Button>    
                </div>
            </PlaylistTableRow>
            : <></>
        }
        </>
    )
}

export default FoundTrackRow