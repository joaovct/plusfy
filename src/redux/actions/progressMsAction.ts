import { ProgressMs, ProgressMsAction, PROGRESS_MS } from "../store/progressMs/types"

interface Action{
    (progressMs: ProgressMs): ProgressMsAction
}

const progressMsAction: Action = (progressMs) => (
    {
        type: PROGRESS_MS,
        payload: {progressMs: progressMs}
    }
)

export default progressMsAction