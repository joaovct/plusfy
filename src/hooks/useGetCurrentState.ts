import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { getPlayer } from '../api/webapi/player'
import { Iplayer } from '../api/webapi/types'
import { Itoken } from '../store/token/types'
import { Istore } from '../store/types'

const useGetCurrentState = () => {
    const [currentState, setCurrentState] = useState<Iplayer>({})
    const {accessToken} = useSelector<Istore, Itoken>(store => store.token)

    useEffect(() => {
        if(accessToken){
            setInterval(async () => {
                const state = await getPlayer({accessToken})
                setCurrentState(state?.data || {})
            }, 2000)
        }
    },[accessToken])

    return currentState
}

export default useGetCurrentState