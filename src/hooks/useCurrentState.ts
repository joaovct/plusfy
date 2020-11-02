import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../redux/actions/actions'
import { isTrackDisabled } from '../api/disabledTracks/disabledTracks'
import { preventDoubleNextPlayer } from '../api/webapi/helperWebAPI'
import { getPlayer } from '../api/webapi/player'
import { IPlayer } from '../api/webapi/types'
import { IToken } from '../redux/store/token/types'
import { IStore } from '../redux/store/types'
import { IUser } from '../redux/store/user/types'

const useCurrentState = () => {
    const [currentState, setCurrentState] = useState<IPlayer>({})
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const {id: userId} = useSelector<IStore, IUser>(store => store.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if(
            isTrackDisabled({userId, playlistUri: currentState.context?.uri || '', trackUri: currentState.item?.uri || ''}) &&
            currentState.context?.type === 'playlist' && currentState.item?.uri
        ){
            preventDoubleNextPlayer(currentState.item.uri, accessToken)
        }
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