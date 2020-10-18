import { IdisabledTracks } from '../api/disabledTracks/types'
import {IdisabledTracks_action, DISABLED_TRACKS} from '../store/disabledTracks/types'

const disabledTracksAction = (disabledTracks: IdisabledTracks) => {
    const actionReturn: IdisabledTracks_action = {
        type: DISABLED_TRACKS,
        payload: disabledTracks
    }
    return actionReturn
}

export default disabledTracksAction