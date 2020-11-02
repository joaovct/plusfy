import {useCallback, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../redux/actions/actions'
import { setDisabledTrack, deleteDisabledTrack, getDisabledTracks, initDisabledTracks } from '../api/disabledTracks/disabledTracks'
import { IStore } from '../../redux/store/types'
import { IUser } from '../../redux/store/user/types'

interface Iaction{
    action: string
    playlistUri: string
    uri: string
}

const useDisabledTracks = () => {
    const {id: userId} = useSelector<IStore, IUser>(store => store.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if(userId)
            dispatch(actions.disabledTracksAction( initDisabledTracks({userId}) ))
    },[userId, dispatch])

    const action = useCallback(({action, playlistUri, uri}: Iaction) => {
        if(userId){
            switch(action){
                case 'set':
                    setDisabledTrack({playlistUri, uri, userId})
                    break
                case 'delete':
                    deleteDisabledTrack({playlistUri, uri, userId})
                    break
            }
            dispatch(actions.disabledTracksAction(getDisabledTracks({userId})))
        }
    },[userId, dispatch])

    return action
}

export default useDisabledTracks