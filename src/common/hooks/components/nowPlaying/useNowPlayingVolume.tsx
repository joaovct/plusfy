import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { IToken } from "../../../../redux/store/token/types"
import { IStore } from "../../../../redux/store/types"
import { setPlayerVolume } from "../../../api/webapi/player"
import { nowPlayingPositionDropdown } from "../../../helpers/helperUI"

interface Hook{
    volume: number
    setVolume: React.Dispatch<React.SetStateAction<number>>
    dropdownRef: React.RefObject<HTMLUListElement>
}

let timeout = 0

const useNowPlayingVolume: () => Hook = () => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const [volume, setVolume] = useState(100)
    const isMounted = useRef(true)
    const dropdownRef = useRef<HTMLUListElement>(null)

    useEffect(() => () => {
        isMounted.current = false
    },[])

    useEffect(() => {
        if(accessToken){
            if(timeout)
                clearTimeout(timeout)
            timeout = setTimeout(() => {
                if(isMounted.current)
                    setPlayerVolume({accessToken, volume_percent: volume})
            },250)
        }
    },[volume, accessToken])

    useEffect(() => {
        if(dropdownRef.current)
            nowPlayingPositionDropdown(dropdownRef.current)
    },[dropdownRef])

    return {
        volume, setVolume, dropdownRef
    }
} 

export default useNowPlayingVolume