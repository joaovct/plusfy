import {useCallback, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../../redux/actions/actions'
import { setDisabledTrack, deleteDisabledTrack, getDisabledStorage, initDisabledTracks } from '../../api/disabledTracks/disabledTracks'
import { IStore } from '../../../redux/store/types'
import { IUser } from '../../../redux/store/user/types'
import { DisabledTrack } from '../../api/disabledTracks/types'

interface Action{
    action: 'enable' | 'disable'
    playlistURI: string
    tracks: DisabledTrack[]
}

const useDisabledTracks = () => {
    const {id: userId} = useSelector<IStore, IUser>(store => store.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if(userId)
            dispatch(actions.disabledTracksAction( initDisabledTracks({userId}) ))
    },[userId, dispatch])

    const action = useCallback(({action, playlistURI, tracks}: Action) => {
        if(userId){
            switch(action){
                case 'disable':
                    setDisabledTrack({playlistURI, tracks, userId})
                    break
                case 'enable':
                    deleteDisabledTrack({playlistURI, tracks, userId})
                    break
            }
            dispatch(actions.disabledTracksAction(getDisabledStorage({userId})))
        }
    },[userId, dispatch])

    return action
}

export default useDisabledTracks