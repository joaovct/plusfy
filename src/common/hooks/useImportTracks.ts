import { useCallback, useState } from "react"
import { useSelector } from "react-redux"
import { IToken } from "../../redux/store/token/types"
import { IStore } from "../../redux/store/types"
import { findTrack } from "../api/server/endpoints"
import searchItem from "../api/webapi/search"
import { Track } from '../api/webapi/types'
import { getTrackFileMetaData } from "../helpers/helperImportTracks"
import {FindTrackResult} from '../api/server/types'

interface FoundTrack{
    file: File
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

        const searchTrack = (track: FindTrackResult) => {
            return new Promise<FoundTrack>( async (resolve) => {
                const finalTrack: FoundTrack = {file: track.file,track: null,search: null} 
                let found = false

                if(track.track){
                    finalTrack.search = `${track.track.title} ${track.track.artists[0].name}`
                    const query = `${track.track.title} artist:${track.track?.artists[0].name}`
                    const results = await searchItem(accessToken, query, 'track')
                    
                    if(results.tracks?.items.length){
                        found = true
                        finalTrack.track = results.tracks?.items[0]
                        return resolve(finalTrack)
                    }
                }

                if(!track.track || !found){
                    getTrackFileMetaData(track.file, async (err, metadata) => {
                        if(err){
                            console.error(err)
                            return resolve(finalTrack)
                        }
                        const search = `${metadata.title} ${metadata.artist[0]}`
                        const query = `${metadata.title} artist:${metadata.artist[0]}`
                        const results = await searchItem(accessToken, query, 'track')
                        if(results.tracks?.items.length){
                            return resolve({...finalTrack, search, track: results.tracks?.items[0]})
                        }   
                        resolve(finalTrack)
                    })
                }
            })
        }

        findTrack(files, resultsTracks => {
            const resultsSearches = resultsTracks.map(searchTrack)
            
            Promise.all(resultsSearches)
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