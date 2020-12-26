import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { ChooseDevice, GetDeviceType } from "../../../../components/utils/privateRoute/nowPlaying/types"
import { ICurrentState } from "../../../../redux/store/currentState/types"
import { IToken } from "../../../../redux/store/token/types"
import { IStore } from "../../../../redux/store/types"
import { getDevices, playPlayer } from "../../../api/webapi/player"
import { Device } from "../../../api/webapi/types"
import { nowPlayingPositionDropdown } from "../../../helpers/helperUI"
import {Smartphone, Tablet, Tv, Speaker, Cast, Monitor} from 'react-feather'

interface Hook{
    dropdownRef: React.RefObject<HTMLUListElement>
    devices: Device[]
    getDeviceIcon: GetDeviceType
    chooseDevice: ChooseDevice
    updateDevices: () => void
}

const useNowPlayingDevices: () => Hook  = () => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)
    const [devices, setDevices] = useState<Device[]>([])
    const dropdownRef = useRef<HTMLUListElement>(null)
    const isMounted = useRef(true)

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
        if(dropdownRef.current)
            nowPlayingPositionDropdown(dropdownRef.current)
    },[dropdownRef])

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

    const chooseDevice: ChooseDevice = async (id: string) => {
        if(id !== currentState.device?.id){
            await playPlayer({accessToken, deviceId: id, contextUri: currentState.context?.uri, offset: {uri: currentState.item?.uri}})
        }
    }

    const updateDevices = async () => {
        const response = await getDevices({accessToken})
        if(isMounted.current && response?.data?.devices)
            setDevices([...response?.data?.devices])
    }

    return{
        dropdownRef, devices, getDeviceIcon, chooseDevice, updateDevices
    }
}

export default useNowPlayingDevices