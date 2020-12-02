import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { HandleToggleOption } from "../../../components/common/ListTracks/ContextListTracks"
import { IToken } from "../../../redux/store/token/types"
import { IStore } from "../../../redux/store/types"
import { getSavedTracks } from "../../api/webapi/library"
import {SavedTracks, Track} from '../../api/webapi/types'

type UpdateQuantitySavedTracks = (tracks: Track[]) => void

type Hook = () => {
    toggleOptions: boolean[]
    handleToggleOption: HandleToggleOption
    savedTracks: SavedTracks | null
    updateSavedTracks: () => void
    updateQuantitySavedTracks: UpdateQuantitySavedTracks
}

const useListTracks: Hook = () => {
    const [toggleOptions, setToggleOptions] = useState<boolean[]>([])
    const [savedTracks, setSavedTracks] = useState<SavedTracks | null>(null)
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)

    const handleToggleOption: HandleToggleOption = (index) => {
        setToggleOptions( value => [...value.map((e,i) => i === index ? !e : false)])
    }

    const updateSavedTracks = useCallback(async () => {
        const response = await getSavedTracks({accessToken})
        setSavedTracks(response)
    },[accessToken])

    const updateQuantitySavedTracks: UpdateQuantitySavedTracks = (tracks) => {
        setToggleOptions(Array(tracks.length).fill(false))
    }

    useEffect(() => {
        updateSavedTracks()
    },[updateSavedTracks])

    return{
        toggleOptions, handleToggleOption,
        savedTracks, updateSavedTracks,
        updateQuantitySavedTracks
    }
}

export default useListTracks