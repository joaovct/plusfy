import { useCallback, useContext } from "react"
import { useSelector } from "react-redux"
import { saveToLibrary } from "../api/webapi/library"
import { addToQueue } from "../api/webapi/player"
import { IPlaylist, ITrack } from "../api/webapi/types"
import { removeTracksPlaylist } from "../api/webapi/webAPI"
import ContextPlaylist from "../components/playlist/ContextPlaylist"
import { IToken } from "../store/token/types"
import { IStore } from "../store/types"
import useDisabledTracks from "./useDisabledTracks"

interface IPropsHook{
    playlist: IPlaylist
    track: ITrack
    index: number
    handleShowOptions: Function
}

const useTrackOptionsAction = ({playlist, track, index, handleShowOptions}: IPropsHook) => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const action = useDisabledTracks()
    const {updatePlaylists} = useContext(ContextPlaylist)

    const actionSaveToLibrary = useCallback(() => {
        if(accessToken){
            handleShowOptions(index)
            saveToLibrary({accessToken, ids: [track.id]})
        }
    },[accessToken,track,handleShowOptions,index])

    const actionAddToQueue = useCallback(() => {
        if(accessToken){
            handleShowOptions(index)
            addToQueue({accessToken, uri: track.uri})
        }
    },[accessToken,track,index,handleShowOptions])
    
    const actionEnableTrack = useCallback(() => {
        handleShowOptions(index)
        setTimeout(() => action({action: 'delete', playlistUri: playlist.uri, uri: track.uri}) ,250)
    },[action, playlist, track, handleShowOptions, index])

    const actionDisableTrack = useCallback(() => {
        handleShowOptions(index)
        setTimeout(() => action({action: 'set', playlistUri: playlist.uri, uri: track.uri}) ,250)
    },[action, playlist, track, handleShowOptions, index])

    const actionRemoveTrack = useCallback(async () => {
        if(accessToken){
            handleShowOptions(index)
            const status = await removeTracksPlaylist(accessToken, {
                playlistId: playlist.id,
                tracks: [{uri: track.uri, positions: [index]}]
            })
            if(status === 200){
                updatePlaylists()
            }
        }
    },[index,accessToken,playlist,track,handleShowOptions, updatePlaylists])

    return {actionSaveToLibrary,actionAddToQueue,actionEnableTrack,actionDisableTrack,actionRemoveTrack}
}

export default useTrackOptionsAction