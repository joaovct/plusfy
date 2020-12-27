import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ICurrentState } from "../../../../redux/store/currentState/types"
import { IToken } from "../../../../redux/store/token/types"
import { IStore } from "../../../../redux/store/types"
import { checkSavedTracks, removeSavedTrack, saveTrack } from "../../../api/webapi/library"

interface Hook{
    (): {
        isTrackSaved: boolean
        handleLike: () => void
    }
}

const useNowPlayingLike: Hook = () => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const {item: currentItem} = useSelector<IStore, ICurrentState>(store => store.currentState) 
    const [isTrackSaved, setIsTrackSaved] = useState(false)

    useEffect(() => {
        if(currentItem && accessToken)
            fetchData()
        async function fetchData(){
            const id = currentItem?.id || ''
            const response = await checkSavedTracks({accessToken, ids: [id]})
            setIsTrackSaved(response[0] ? true : false)
        }
    },[currentItem, accessToken])

    const handleLike = () => {
        setIsTrackSaved(old => !old)
        const id = currentItem?.id || ''
        if(isTrackSaved)
            return removeSavedTrack({accessToken, ids: [id]})
        return saveTrack({accessToken, ids: [id]})
    }

    return {isTrackSaved, handleLike}
}

export default useNowPlayingLike