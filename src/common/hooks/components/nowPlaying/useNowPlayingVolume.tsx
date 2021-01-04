import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { ICurrentState } from "../../../../redux/store/currentState/types"
import { IToken } from "../../../../redux/store/token/types"
import { IStore } from "../../../../redux/store/types"
import { setPlayerVolume } from "../../../api/webapi/player"
import { nowPlayingPositionDropdown } from "../../../helpers/helperUI"

interface Hook{
    volume: number | null
    setVolume: React.Dispatch<React.SetStateAction<number | null>>
    dropdownRef: React.RefObject<HTMLUListElement>
}

let timeout = 0

const useNowPlayingVolume: () => Hook = () => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)
    const [volume, setVolume] = useState<number | null>(null)
    const isMounted = useRef(true)
    const dropdownRef = useRef<HTMLUListElement>(null)

    useEffect(() => () => {
        isMounted.current = false
    },[])

    useEffect(() => {
        setVolume(currentState.device?.volume_percent || null)
    },[currentState])

    useEffect(() => {
        if(accessToken && currentState){
            if(timeout)
                clearTimeout(timeout)
            timeout = setTimeout(() => {
                if(isMounted.current && volume !== null && volume !== currentState.device?.volume_percent){
                    setPlayerVolume({accessToken, volume_percent: volume})
                }
            },250)
        }
    },[volume, currentState, accessToken])

    useEffect(() => {
        if(dropdownRef.current)
            nowPlayingPositionDropdown(dropdownRef.current)
    },[dropdownRef])

    return {
        volume, setVolume, dropdownRef
    }
} 

export default useNowPlayingVolume