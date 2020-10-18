import { IcurrentState_action, IcurrentState, CURRENT_STATE } from '../store/currentState/types'

const currentStateAction = (currentState: IcurrentState) => {
    const actionReturn: IcurrentState_action = {
        type: CURRENT_STATE,
        payload: currentState
    }
    return actionReturn
}

export default currentStateAction

