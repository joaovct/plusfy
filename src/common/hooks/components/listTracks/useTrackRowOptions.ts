import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ContextListTracks from "../../../../components/common/listTracks/ContextListTracks"
import { IToken } from "../../../../redux/store/token/types"
import { IStore } from "../../../../redux/store/types"
import { checkSavedTracks, removeSavedTrack, saveTrack } from "../../../api/webapi/library"
import { addToQueue } from "../../../api/webapi/player"
import { Track } from "../../../api/webapi/types"
import useAddToPlaylist from "../addPlaylist/useAddToPlaylist"
import useAlert from "../alert/useAlert"

interface HookProps{
    track: Track,
    index: number
    isContextAvailable?: boolean
    callbackContextUnavailable?: Function
}

type Hook = ({track, index}: HookProps) => {
    actionSaveTrack: () => void
    actionRemoveSavedTrack: () => void
    actionAddToPlaylist: () => void
    actionAddToQueue: () => void
    trackSaved: boolean | null
}

const useTrackRowOptions: Hook = ({track, index, isContextAvailable = true, callbackContextUnavailable}) => {
    const {handleToggleOption, updateSavedTracks, savedTracks} = useContext(ContextListTracks)
    const createAlert = useAlert()
    const addToPlaylist = useAddToPlaylist()
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const [trackSaved, setTrackSaved] = useState<boolean | null>(null)
    
    const handleCallback = () => {
        if(isContextAvailable)
            handleToggleOption(index)
        else if(callbackContextUnavailable)
            callbackContextUnavailable()
    }

    const actionSaveTrack = async () => {
        handleCallback()
        const status = await saveTrack({accessToken, ids: [track.id]})
        if(status === 200 && isContextAvailable && updateSavedTracks)
            updateSavedTracks()
    }

    const actionRemoveSavedTrack = async () => {
        handleCallback()
        const status = await removeSavedTrack({accessToken, ids: [track.id]})
        if(status === 200 && isContextAvailable && updateSavedTracks)
            updateSavedTracks()
    }

    const actionAddToPlaylist = () => {
        handleCallback()
        addToPlaylist('track', [track.uri])
    }

    const actionAddToQueue = async () => {
        handleCallback()
        const res = await addToQueue({accessToken, uri: track.uri})
        if(res?.status === 204)
            createAlert('normal','Música adicionada à fila 🎶')
    }

    useEffect(() => {
        if(isContextAvailable){
            setTrackSaved(() => {
                const index = savedTracks?.items.findIndex(item => item.track.uri === track.uri)
                if(index !== undefined && index > -1)
                    return true
                else if(index !== undefined)
                    return false
                return null
            })
        }else
            fetchData()

        async function fetchData(){
            if(accessToken){
                const [isTrackSaved] = await checkSavedTracks({accessToken, ids: [track?.id || '']})
                setTrackSaved(() => {
                    if(isTrackSaved === true)
                        return true
                    else if(isTrackSaved === false)
                        return false
                    return null
                })
            }
        }
    },[savedTracks, track, isContextAvailable, accessToken])

    return {
        actionSaveTrack,
        actionRemoveSavedTrack,
        actionAddToPlaylist,
        actionAddToQueue,
        trackSaved
    }
}

export default useTrackRowOptions