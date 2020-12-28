import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../../redux/actions/actions'
import { isTrackDisabled } from '../../api/disabledTracks/disabledTracks'
import { handleNextPlayer } from '../../helpers/helperWebAPI'
import { getPlayer } from '../../api/webapi/player'
import { IToken } from '../../../redux/store/token/types'
import { IStore } from '../../../redux/store/types'
import { IUser } from '../../../redux/store/user/types'
import { isUserConnected } from '../../helpers/helperUserAccess'
import { ICurrentState } from '../../../redux/store/currentState/types'
import store from '../../../redux/store/store'
import { isDifferent } from '../../helpers/helperDeepComparative'

let interval = 0

const useCurrentState = () => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const {id: userId} = useSelector<IStore, IUser>(store => store.user)
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)
    const dispatch = useDispatch()

    useEffect(() => {
        if(accessToken){
            if(interval)
                clearInterval(interval)
            
            interval = setInterval(() => {
                if(isUserConnected().connected)
                    return updateCurrentState()
                return clearInterval(interval)
            },1000)
        }
        async function updateCurrentState(){
            const response = await getPlayer({accessToken})
            if(response?.data){
                const {progress_ms, ...currentState} = response.data

                if(isDifferent(currentState, store.getState().currentState)){
                    dispatch(actions.currentStateAction(currentState))
                }
            }
        }
    },[accessToken, dispatch])

    useEffect(() => {
        if(accessToken && isUserConnected().connected){ 
            const playlistURI = currentState.context?.uri || ''
            const trackURI = currentState.item?.uri || ''

            if( isTrackDisabled({userId, playlistURI, trackURI}) && currentState.context?.type === 'playlist' && trackURI )
                handleNextPlayer(trackURI, accessToken)
        }
    },[accessToken, currentState, userId])
}

export default useCurrentState