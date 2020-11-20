import { useCallback, useState } from "react"
import { useSelector } from "react-redux"
import { IToken } from "../../redux/store/token/types"
import { IStore } from "../../redux/store/types"
import { findTrack } from "../api/server/endpoints"
import searchItem from "../api/webapi/search"
import { Track } from '../api/webapi/types'

interface FoundTrack{
    fileName: string
    track: Track | null
    search: string | null
}

type Status = 'none' | 'loading' | 'success' | 'error'

interface ActionFindTrack{
    (files: Array<File>): void
}

const useImportTracks = () => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const [foundTracks, setFoundTracks] = useState<Array<FoundTrack>>([])
    const [status, setStatus] = useState<Status>("none")

    const actionFindTrack = useCallback<ActionFindTrack>((files) => {
        setStatus('loading')
        findTrack(files, (resultsTracks) => {
            const searches = resultsTracks.map(track => new Promise<FoundTrack>(async (resolve) => {
                const finalTrack: FoundTrack = {
                    fileName: track.fileName,
                    track: null,
                    search: null
                } 
    
                if(track.track){
                    finalTrack.search = `${track.track.title} ${track.track.artists[0].name}`
                    const query = track.track.title + ` artist:${track.track?.artists[0].name}`
                    const results = await searchItem(accessToken, query, 'track')
                    
                    if(results.tracks?.items.length)
                        finalTrack.track = results.tracks?.items[0]
                }
                resolve(finalTrack)
            }))
    
            Promise.all(searches)
                .then( results => {
                    setStatus('success')
                    setFoundTracks(results)
                })
                .catch( err => {
                    console.error(err)
                    setStatus('error')
                })
        })
    },[accessToken])

    return {foundTracks, status, actionFindTrack}    
}

export default useImportTracks