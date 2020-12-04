import {useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../../redux/actions/actions'
import { isTrackDisabled } from '../../api/disabledTracks/disabledTracks'
import { handleNextPlayer } from '../../helpers/helperWebAPI'
import { getPlayer } from '../../api/webapi/player'
import { IToken } from '../../../redux/store/token/types'
import { IStore } from '../../../redux/store/types'
import { IUser } from '../../../redux/store/user/types'
import { isUserConnected } from '../../helpers/helperUserAccess'

const useCurrentState = () => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const {id: userId} = useSelector<IStore, IUser>(store => store.user)
    const dispatch = useDispatch()

    const handleUpdatePlayer = useCallback(async () => {
        let interval = setInterval(() => {
            if(isUserConnected().connected && userId){
                updatePlayer()
            }else{
                clearInterval(interval)
            }
        },1000)

        async function updatePlayer(){
            const response = await getPlayer({accessToken})
            if(response){
                const {data} = response
    
                dispatch(actions.currentStateAction(data || {}))
    
                const playlistUri = data.context?.uri || ''
                const trackUri = data.item?.uri || ''
                
                if(isTrackDisabled({userId, playlistUri, trackUri}) && data.context?.type === 'playlist' && trackUri)
                    handleNextPlayer(trackUri, accessToken)
            }
        }
    },[accessToken, dispatch, userId])

    useEffect(() => {
        if(accessToken){
            handleUpdatePlayer()
        }
    },[accessToken, handleUpdatePlayer])
}

export default useCurrentState