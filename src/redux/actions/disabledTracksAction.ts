import { DisabledStorage } from '../../common/api/disabledTracks/types'
import {IDisabledTracks_action, DISABLED_TRACKS} from '../store/disabledTracks/types'

const disabledTracksAction = (disabledTracks: DisabledStorage) => {
    const actionReturn: IDisabledTracks_action = {
        type: DISABLED_TRACKS,
        payload: disabledTracks
    }
    return actionReturn
}

export default disabledTracksAction