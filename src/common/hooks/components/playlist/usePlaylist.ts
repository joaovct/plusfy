import { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from "react-router-dom"
import { IToken } from '../../../../redux/store/token/types'
import { IStore } from '../../../../redux/store/types'
import { getSavedTracks } from '../../../api/webapi/library'
import { fetchPlaylist } from '../../../api/webapi/playlists'
import { Playlist as IPlaylist, SavedTracks } from '../../../api/webapi/types'
import { FakePlaylist } from '../../../../components/playlist/types'
import useQuery from '../../useQuery'
import { getTracks } from '../../../api/webapi/track'

const usePlaylist = () => {
    const { id } = useParams<{id: string}>()
    const { name, tracks: tracksIDs } = useQuery()
    const [playlist, setPlaylist] = useState<IPlaylist | null>(null)
    const [fakePlaylist, setFakePlaylist] = useState<FakePlaylist | null>(null)
    const [savedTracks, setSavedTracks] = useState<SavedTracks | null>(null) 
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const history = useHistory()
    const isMounted = useRef(true)
    const location = useLocation()

    useEffect(() => {
        if(isMounted.current){
            let el = document.getElementById('root')
            
            if(el){
                el.scrollTop = 0
            }
        }

    },[location])

    const updatePlaylist = useCallback(async () => {
        const response = await fetchPlaylist(accessToken, id)

        if(response && isMounted.current){
            setPlaylist(response)
            setFakePlaylist(null)
        }else if(!response){
            history.push("/invalid-id")
        }

    },[id, accessToken, history])

    const handleFakePlaylist = useCallback(async () => {
        const response = await getTracks(accessToken, tracksIDs.split(','))
        
        if(response.tracks && isMounted.current){
            setFakePlaylist({name, tracks: response.tracks})
            setPlaylist(null)
        }else if(!response.tracks){
            history.push("/invalid-id")
        }

    },[name, tracksIDs, accessToken, history])

    const updateSavedTracks = useCallback(async () => {
        if(accessToken){
            const response = await getSavedTracks({accessToken})
        
            if(response && isMounted.current){
                setSavedTracks(response)
            }else if(isMounted.current){
                setSavedTracks(null)
            }
        }
    },[accessToken])

    useEffect(() => {
        if(accessToken && id){
            updatePlaylist()
        }else if(accessToken && name && tracksIDs){
            handleFakePlaylist()
        }
    },[location, accessToken, id, name, tracksIDs, updatePlaylist, handleFakePlaylist])

    useEffect(() => {
        if(accessToken && (id || (name && tracksIDs))){
            updateSavedTracks()
        }
    },[accessToken, name, tracksIDs, id, updateSavedTracks])

    useEffect(() => {
        return () => {isMounted.current = false}
    },[isMounted])

    return {
        updatePlaylist,
        updateSavedTracks,
        playlist,
        fakePlaylist,
        savedTracks
    }
}

export default usePlaylist