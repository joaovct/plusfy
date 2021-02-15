import { useContext, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import ContextListTracks from "../../../../components/common/listTracks/ContextListTracks"
import { IToken } from "../../../../redux/store/token/types"
import { IStore } from "../../../../redux/store/types"
import { getRecommendations } from "../../../api/webapi/browse"
import { checkSavedTracks, removeSavedTrack, saveTrack } from "../../../api/webapi/library"
import { addToQueue } from "../../../api/webapi/player"
import { Track } from "../../../api/webapi/types"
import useAddToPlaylist from "../addPlaylist/useAddToPlaylist"
import useAlert from "../alert/useAlert"
import qs from 'query-string'
import { useHistory } from "react-router-dom"

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
    actionTrackRecommendation: () => void
    trackSaved: boolean | null
}

//@ts-ignore
const useTrackRowOptions: Hook = ({track, index, isContextAvailable = true, callbackContextUnavailable}) => {
    const {handleToggleOption, updateSavedTracks, savedTracks} = useContext(ContextListTracks)
    const createAlert = useAlert()
    const addToPlaylist = useAddToPlaylist()
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const [trackSaved, setTrackSaved] = useState<boolean | null>(null)
    const isMounted = useRef(true)
    const history = useHistory()

    useEffect(() => {
        return () => {isMounted.current = false}
    },[])
        
    const handleCallback = () => {
        if(isContextAvailable)
            handleToggleOption(index)
        else if(callbackContextUnavailable)
            callbackContextUnavailable()
    }

    const actionSaveTrack = async () => {
        handleCallback()
        const status = await saveTrack({accessToken, ids: [track?.id || '']})
        if(status === 200 && isContextAvailable && updateSavedTracks)
            updateSavedTracks()
    }

    const actionRemoveSavedTrack = async () => {
        handleCallback()
        const status = await removeSavedTrack({accessToken, ids: [track?.id || '']})
        if(status === 200 && isContextAvailable && updateSavedTracks)
            updateSavedTracks()
    }

    const actionAddToPlaylist = () => {
        handleCallback()
        addToPlaylist('add-track', [track?.uri || ''])
    }

    const actionTrackRecommendation = async () => {
        handleCallback()
        const artistsIds = track?.artists.map(artist => artist.id) || []
        const data = await getRecommendations(accessToken, {seed_tracks: [track?.id || ''], seed_artists: artistsIds})

        if(!data.tracks){
            return createAlert('normal', 'Infelizmente não conseguimos gerar as recomendações 🙁')
        }

        const tracks = [track?.id, ...data.tracks.map(track => track?.id)].toString() 
        const queryParameters = qs.stringify({name: `${track?.name} - Recomendações`, tracks})
        return history.push(`/playlist?${queryParameters}`)
    }

    const actionAddToQueue = async () => {
        handleCallback()
        const res = await addToQueue({accessToken, uri: track?.uri || ''})
        if(res?.status === 204)
            createAlert('normal','Música adicionada à fila 🎶')
    }

    useEffect(() => {
        if(isContextAvailable && isMounted.current){
            setTrackSaved(() => {
                const index = savedTracks?.items.findIndex(item => item.track?.uri === track?.uri)
                if(index !== undefined && index > -1)
                    return true
                else if(index !== undefined)
                    return false
                return null
            })
        }else{
            fetchData()
        }

        async function fetchData(){
            if(accessToken){
                const [isTrackSaved] = await checkSavedTracks({accessToken, ids: [track?.id || '']})
                if(isMounted.current){
                    setTrackSaved(() => {
                        if(isTrackSaved === true)
                            return true
                        else if(isTrackSaved === false)
                            return false
                        return null
                    })
                }
            }
        }
    },[savedTracks, track, isContextAvailable, accessToken])

    return {
        actionSaveTrack,
        actionRemoveSavedTrack,
        actionAddToPlaylist,
        actionAddToQueue,
        actionTrackRecommendation,
        trackSaved
    }
}

export default useTrackRowOptions