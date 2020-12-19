import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { IToken } from "../../../../redux/store/token/types"
import { IStore } from "../../../../redux/store/types"
import { nowPlayingPositionDropdown } from "../../../helpers/helperUI"
import {VolumeX, Volume, Volume1, Volume2, Smartphone, Tablet, Speaker, Tv, Monitor, Cast} from 'react-feather'
import { getDevices, setPlayerVolume, playPlayer } from "../../../api/webapi/player"
import { Device } from "../../../api/webapi/types"
import { ICurrentState } from "../../../../redux/store/currentState/types"

type HandleToggleDropdowns = (index: number) => void
type ChooseDevice = (id: string) => void
type GetVolumeIcon = () => JSX.Element
type GetDeviceType = (type: Device['type']) => JSX.Element

interface Hook{
    ():{
        toggleDropdowns: boolean[]
        handleToggleDropdowns: HandleToggleDropdowns
        volume: number
        setVolume: React.Dispatch<React.SetStateAction<number>>
        devices: Device[]
        volumeDropdownRef: React.RefObject<HTMLUListElement>
        devicesDropdownRef: React.RefObject<HTMLUListElement>
        chooseDevice: ChooseDevice
        getVolumeIcon: GetVolumeIcon
        getDeviceIcon: GetDeviceType
    }
}

let timeout = 0
let interval = 0

const useNowPlayingRightButtons: Hook = () => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)
    const [volume, setVolume] = useState(100)
    const [toggleDropdowns, setToggleDropdowns] = useState([false, false]) 
    const [devices, setDevices] = useState<Device[]>([])
    const isMounted = useRef(true)
    const volumeDropdownRef = useRef<HTMLUListElement>(null)
    const devicesDropdownRef = useRef<HTMLUListElement>(null)

    useEffect(() => () => {
        isMounted.current = false
    },[])

    useEffect(() => {
        if(accessToken)
            fetchData()
        async function fetchData(){
            const response = await getDevices({accessToken})
            if(isMounted.current && response?.data?.devices)
                setDevices([...response?.data?.devices])
        }
    },[accessToken])

    useEffect(() => {
        if(accessToken && toggleDropdowns[0]){
            fetchData()
            interval = setInterval(fetchData, 5000)
        }else if(!toggleDropdowns[0]){
            clearInterval(interval)
        }
        async function fetchData(){
            const response = await getDevices({accessToken})
            if(isMounted.current && response?.data?.devices)
                setDevices([...response?.data?.devices])
        }
    },[accessToken, toggleDropdowns])

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
        if(volumeDropdownRef.current)
            nowPlayingPositionDropdown(volumeDropdownRef.current)
    },[volumeDropdownRef])

    useEffect(() => {
        if(devicesDropdownRef.current)
            nowPlayingPositionDropdown(devicesDropdownRef.current)
    },[devicesDropdownRef])

    const getVolumeIcon: GetVolumeIcon = () => {
        if(volume === 0)
            return <VolumeX/>
        else if(volume <= 25)
            return <Volume/>
        else if(volume <= 50)
            return <Volume1/>
        return <Volume2/>
    }

    const getDeviceIcon: GetDeviceType = (type: Device['type']) => {
        if(type === 'Smartphone')
            return <Smartphone/>
        else if(type === 'Tablet')
            return <Tablet/>
        else if(type === 'TV')
            return <Tv/>
        else if(type === 'Speaker')
            return <Speaker/>
        else if(type === 'CastAudio' || type === 'CastVideo')
            return <Cast/>
        return <Monitor/>
    }

    const handleToggleDropdowns: HandleToggleDropdowns = (index) => {
        setToggleDropdowns(items => items.map((item, i) => i === index ? !item : false))
    }

    const chooseDevice: ChooseDevice = async (id: string) => {
        handleToggleDropdowns(0)
        if(id !== currentState.device?.id){
            await playPlayer({accessToken, deviceId: id, contextUri: currentState.context?.uri, offset: {uri: currentState.item?.uri}})
        }
    }

    return {toggleDropdowns, handleToggleDropdowns, devices, volume, setVolume, volumeDropdownRef, devicesDropdownRef, getVolumeIcon, getDeviceIcon,chooseDevice}
}

export default useNowPlayingRightButtons