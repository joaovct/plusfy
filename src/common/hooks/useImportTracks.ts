import { useState } from "react"
import { useSelector } from "react-redux"
import { IToken } from "../../redux/store/token/types"
import { IStore } from "../../redux/store/types"
import { findTrack } from "../api/server/endpoints"
import { FoundTrack, searchFoundTrack } from "../helpers/helperImportTracks"

type Status = 'none' | 'loading' | 'success' | 'error'

export interface ActionFindTrack{
    (files: Array<File>): void
}

const useImportTracks = () => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const [foundTracks, setFoundTracks] = useState<FoundTrack[]>([])
    const [status, setStatus] = useState<Status>("none")

    const actionFindTrack: ActionFindTrack = files => {
        setStatus('loading')

        findTrack(files, resultsTracks => {
            const promiseSearches = resultsTracks.map( track => searchFoundTrack(track, accessToken))

            Promise.all(promiseSearches)
                .then(results => {
                    setStatus('success')
                    setFoundTracks(results)
                })
                .catch(err => {
                    console.error(err)
                    setStatus('error')
                })
        })
    }

    return {foundTracks, status, actionFindTrack}    
}

export default useImportTracks