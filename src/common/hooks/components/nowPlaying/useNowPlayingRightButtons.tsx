import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { IToken } from "../../../../redux/store/token/types"
import { IStore } from "../../../../redux/store/types"
import { nowPlayingPositionDropdown } from "../../../helpers/helperUI"
import {VolumeX, Volume, Volume1, Volume2} from 'react-feather'
import { setPlayerVolume } from "../../../api/webapi/player"

interface Hook{
    ():{
        volume: number
        setVolume: React.Dispatch<React.SetStateAction<number>>
        toggleDropdownVolume: boolean
        setToggleDropdownVolume: React.Dispatch<React.SetStateAction<boolean>>
        volumeRef: React.RefObject<HTMLUListElement>
        getVolumeIcon: () => JSX.Element
    }
}

let timeout = 0

const useNowPlayingRightButtons: Hook = () => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const [volume, setVolume] = useState(100)
    const [toggleDropdownVolume, setToggleDropdownVolume] = useState(false)
    const volumeRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
        if(accessToken){
            if(timeout)
                clearTimeout(timeout)
            timeout = setTimeout(() => {
                setPlayerVolume({accessToken, volume_percent: volume})
            },250)
        }
    },[volume, accessToken])

    useEffect(() => {
        if(volumeRef.current)
            nowPlayingPositionDropdown(volumeRef.current)
    },[volumeRef])

    const getVolumeIcon = () => {
        if(volume === 0)
            return <VolumeX/>
        else if(volume <= 25)
            return <Volume/>
        else if(volume <= 50)
            return <Volume1/>
        return <Volume2/>
    }

    return {toggleDropdownVolume, setToggleDropdownVolume, volume, setVolume, volumeRef, getVolumeIcon}
}

export default useNowPlayingRightButtons