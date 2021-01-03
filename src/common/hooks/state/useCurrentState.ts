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
import store from '../../../redux/store/store'
import _ from 'lodash'

let interval = 0
const intervalTimeout = 850

const useCurrentState = () => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const {id: userId} = useSelector<IStore, IUser>(store => store.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if(accessToken && userId){
            if(interval)
                clearInterval(interval)
            
            interval = setInterval(() => {
                if(isUserConnected().connected)
                    return updateCurrentState()
                return clearInterval(interval)
            },intervalTimeout)
        }
        async function updateCurrentState(){
            const response = await getPlayer({accessToken})
            if(response?.data){
                const {progress_ms, ...currentState} = response.data

                if(!_.isEqual(currentState, store.getState().currentState)){
                    dispatch(actions.currentStateAction(currentState))

                    const playlistURI = currentState.context?.uri || ''
                    const trackURI = currentState.item?.uri || ''

                    if( isTrackDisabled({userId, playlistURI, trackURI}) && currentState.context?.type === 'playlist'){
                        handleNextPlayer(trackURI, accessToken)
                    }
                }
                // dispatch(actions.progressMsAction(progress_ms || 0))

            }
        }
    },[accessToken, userId, dispatch])
}

export default useCurrentState