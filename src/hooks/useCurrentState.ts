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
        if(
            Object.keys(currentState).length &&
            currentState.context?.type === 'playlist' &&
            isTrackDisabled({userId, playlistUri: currentState.context.uri, trackUri: currentState.item?.uri || ''}) &&
            accessToken
        ){
            nextPlayer({accessToken})
        }
    },[currentState, userId, accessToken])

    useEffect(() => {
        if(Object.keys(currentState).length){
            dispatch(actions.currentStateAction(currentState))
        }
    },[currentState, dispatch])

    useEffect(() => {
        if(accessToken){
            setInterval(async () => {
                const state = await getPlayer({accessToken})
                setCurrentState(state?.data || {})
            }, 1000)
        }
    },[accessToken])
}

export default useCurrentState