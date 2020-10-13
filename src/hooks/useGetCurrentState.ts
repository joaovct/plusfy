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
        let isMounted = true
        if(accessToken){
            setInterval(async () => {
                const state = await getPlayer({accessToken})
                if(isMounted) setCurrentState(state?.data || {})
            }, 1000)
        }
        return () => {isMounted = false}
    },[accessToken])

    return currentState
}

export default useGetCurrentState