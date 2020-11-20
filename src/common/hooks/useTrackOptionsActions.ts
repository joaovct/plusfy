import { useCallback, useContext, useEffect } from "react"
import { useSelector } from "react-redux"
import { removeSavedTrack, saveTrack } from "../api/webapi/library"
import { addToQueue } from "../api/webapi/player"
import { IPlaylist, Track } from "../api/webapi/types"
import { removeTracksPlaylist } from "../api/webapi/playlists"
import ContextPlaylist from "../../components/playlist/ContextPlaylist"
import { IToken } from "../../redux/store/token/types"
import { IStore } from "../../redux/store/types"
import useDisabledTracks from "./useDisabledTracks"
import useAddPlaylist from "./useAddPlaylist"

interface IPropsHook{
    playlist: IPlaylist | null
    track: Track
    index: number
    handleShowOptions: Function
}

const useTrackOptionsAction = ({playlist, track, index, handleShowOptions}: IPropsHook) => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const {updatePlaylist, updateSavedTracks} = useContext(ContextPlaylist)
    const action = useDisabledTracks()
    const {status: addPlaylistStatus, addPlaylist} = useAddPlaylist()

    const actionSaveTrack = useCallback(async () => {
        if(accessToken){
            handleShowOptions(index)
            const status = await saveTrack({accessToken, ids: [track.id]})
            if(status === 200){
                updateSavedTracks()
            }
        }
    },[accessToken,track,handleShowOptions,index, updateSavedTracks])

    const actionRemoveSavedTrack = useCallback(async () => {
        if(accessToken){
            handleShowOptions(index)
            const status = await removeSavedTrack({accessToken, ids: [track.id]})
            if(status === 200){
                updateSavedTracks()
            }
        }
    },[accessToken,track,handleShowOptions,index, updateSavedTracks])

    const actionAddToQueue = useCallback(() => {
        if(accessToken){
            handleShowOptions(index)
            addToQueue({accessToken, uri: track.uri})
        }
    },[accessToken,track,index,handleShowOptions])
    
    const actionEnableTrack = useCallback(() => {
        if(playlist){
            handleShowOptions(index)
            setTimeout(() => action({action: 'delete', playlistUri: playlist.uri, uri: track.uri}) ,250)
        }
    },[action, playlist, track, handleShowOptions, index])

    const actionDisableTrack = useCallback(() => {
        if(playlist){
            handleShowOptions(index)
            setTimeout(() => action({action: 'set', playlistUri: playlist.uri, uri: track.uri}) ,250)
        }
    },[action, playlist, track, handleShowOptions, index])

    const actionAddToPlaylist = useCallback(() => {
        handleShowOptions(index)
        addPlaylist('track', [track.uri])
    },[track, addPlaylist, handleShowOptions, index])

    useEffect(() => {
        if(addPlaylistStatus?.state === 'added')
            updatePlaylist()
    //eslint-disable-next-line
    },[addPlaylistStatus])

    const actionRemoveTrack = useCallback(async () => {
        if(accessToken && playlist){
            handleShowOptions(index)
            const status = await removeTracksPlaylist(accessToken, {
                playlistId: playlist.id,
                tracks: [{uri: track.uri, positions: [index]}]
            })
            if(status === 200){
                updatePlaylist()
            }
        }
    },[index,accessToken,playlist,track,handleShowOptions, updatePlaylist])

    return {actionSaveTrack,actionRemoveSavedTrack,actionAddToQueue,actionEnableTrack,actionDisableTrack,actionAddToPlaylist,actionRemoveTrack}
}

export default useTrackOptionsAction