import {useState} from 'react'
import { HandleToggleDropdowns, UpdateFatherVolume } from "../../../../components/common/nowPlaying/types"


interface Hook{
    ():{
        toggleDropdowns: boolean[]
        handleToggleDropdowns: HandleToggleDropdowns
        volume: number
        updateFatherVolume: UpdateFatherVolume
    }
}

const useNowPlayingAdditionalButtons: Hook = () => {
    const [toggleDropdowns, setToggleDropdowns] = useState([false, false])
    const [volume, setVolume] = useState<number | undefined>()

    const handleToggleDropdowns: HandleToggleDropdowns = (n) => {
        setToggleDropdowns(value => {
            return value.map((item, i) => i === n ? !item : false)
        })
    } 

    const updateFatherVolume: UpdateFatherVolume = (volume) => {
        setVolume(volume)
    }

    return {toggleDropdowns, handleToggleDropdowns, updateFatherVolume, volume: volume || 100}
}

export default useNowPlayingAdditionalButtons