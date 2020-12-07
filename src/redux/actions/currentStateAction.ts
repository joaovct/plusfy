import { IPlayer } from '../../common/api/webapi/types'
import { ICurrentState_action, CURRENT_STATE } from '../store/currentState/types'

const currentStateAction = (currentState: IPlayer): ICurrentState_action => ({
    type: CURRENT_STATE,
    payload: {...currentState}
})

export default currentStateAction

