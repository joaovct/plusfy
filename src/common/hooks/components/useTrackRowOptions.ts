import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ContextListTracks from "../../../components/common/ListTracks/ContextListTracks"
import { IToken } from "../../../redux/store/token/types"
import { IStore } from "../../../redux/store/types"
import { removeSavedTrack, saveTrack } from "../../api/webapi/library"
import { addToQueue } from "../../api/webapi/player"
import { Track } from "../../api/webapi/types"
import useAddToPlaylist from "./useAddToPlaylist"
import useAlert from "./useAlert"

interface HookProps{
    track: Track,
    index: number
}

type Hook = ({track, index}: HookProps) => {
    actionSaveTrack: () => void
    actionRemoveSavedTrack: () => void
    actionAddToPlaylist: () => void
    actionAddToQueue: () => void
    trackSaved: boolean | null
}

const useTrackRowOptions: Hook = ({track, index}) => {
    const {handleToggleOption, updateSavedTracks, savedTracks} = useContext(ContextListTracks)
    const createAlert = useAlert()
    const addToPlaylist = useAddToPlaylist()
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const [trackSaved, setTrackSaved] = useState<boolean | null>(null)
    
    const actionSaveTrack = async () => {
        handleToggleOption(index)
        const status = await saveTrack({accessToken, ids: [track.id]})
        if(status === 200){}
            updateSavedTracks()
    }

    const actionRemoveSavedTrack = async () => {
        handleToggleOption(index)
        const status = await removeSavedTrack({accessToken, ids: [track.id]})
        if(status === 200){}
            updateSavedTracks()
    }

    const actionAddToPlaylist = () => {
        handleToggleOption(index)
        addToPlaylist('track', [track.uri])
    }

    const actionAddToQueue = async () => {
        handleToggleOption(index)
        const res = await addToQueue({accessToken, uri: track.uri})
        if(res?.status === 204)
            createAlert('success','Música adicionada à fila 🎶')
    }

    useEffect(() => {
        setTrackSaved(() => {
            const index = savedTracks?.items.findIndex(item => item.track.uri === track.uri)
            if(index !== undefined && index > -1)
                return true
            else if(index !== undefined)
                return false
            return null
        })
    },[savedTracks, track])

    return {
        actionSaveTrack,
        actionRemoveSavedTrack,
        actionAddToPlaylist,
        actionAddToQueue,
        trackSaved
    }
}

export default useTrackRowOptions