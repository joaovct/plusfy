import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../actions/actions'
import { isTrackDisabled } from '../api/disabledTracks/disabledTracks'
import { getPlayer, nextPlayer } from '../api/webapi/player'
import { Iplayer } from '../api/webapi/types'
import { Itoken } from '../store/token/types'
import { Istore } from '../store/types'
import { Iuser } from '../store/user/types'

const useCurrentState = () => {
    const [currentState, setCurrentState] = useState<Iplayer>({})
    const {accessToken} = useSelector<Istore, Itoken>(store => store.token)
    const {id: userId} = useSelector<Istore, Iuser>(store => store.user)
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            if(
                accessToken &&
                Object.keys(currentState).length &&
                currentState.context?.type === 'playlist' &&
                currentState.item?.uri &&
                isTrackDisabled({userId, playlistUri: currentState.context.uri, trackUri: currentState.item?.uri || ''})
            ){
                nextPlayer({accessToken})
            }
        },1000)
    },[currentState, userId, accessToken])

    useEffect(() => {
        if(Object.keys(currentState).length){
            dispatch(actions.currentStateAction(currentState))
        }
    },[currentState, dispatch])

    useEffect(() => {
        let mounted = true
        if(accessToken){
            setInterval(async () => {
                const state = await getPlayer({accessToken})
                if(mounted) setCurrentState(state?.data || {})
            }, 1000)
        }
        return () => {mounted = false}
    },[accessToken])
}

export default useCurrentState