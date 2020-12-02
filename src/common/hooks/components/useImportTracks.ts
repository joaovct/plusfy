import { useState } from "react"
import { useSelector } from "react-redux"
import { IToken } from "../../../redux/store/token/types"
import { IStore } from "../../../redux/store/types"
import { findTrack } from "../../api/server/endpoints"
import { searchFoundTrack } from "../../helpers/helperImportTracks"
import { ContextProps, FoundTrack, StatusImport, ActionFindTrack } from '../../../components/importTracks/types'

const useImportTracks = (): ContextProps => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const [foundTracks, setFoundTracks] = useState<FoundTrack[]>([])
    const [statusImport, setStatusImport] = useState<StatusImport>("none")

    const actionFindTrack: ActionFindTrack = files => {
        setStatusImport('loading')

        findTrack(files, resultsTracks => {
            const promiseSearches = resultsTracks.map( track => searchFoundTrack(track, accessToken))

            Promise.all(promiseSearches)
                .then(results => {
                    setStatusImport('success')
                    setFoundTracks(results)
                })
                .catch(err => {
                    console.error(err)
                    setStatusImport('error')
                })
        })
    }

    const actionStartResetImportTracks = () => {
        setFoundTracks([])
        setStatusImport('reseting')
    }

    const actionFinishResetImportTracks = () => {
        setStatusImport('none')
    }

    return {foundTracks, statusImport, actionFindTrack, actionStartResetImportTracks, actionFinishResetImportTracks}    
}

export default useImportTracks