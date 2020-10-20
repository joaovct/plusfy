import { ICurrentState_action, ICurrentState, CURRENT_STATE } from '../store/currentState/types'

const currentStateAction = (currentState: ICurrentState) => {
    const actionReturn: ICurrentState_action = {
        type: CURRENT_STATE,
        payload: currentState
    }
    return actionReturn
}

export default currentStateAction

