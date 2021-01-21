import { ContextProps } from "../../../../components/mood/types"
import { UserTopArtistsAndTracksTimeRange } from "../../../api/webapi/types"

export type UpdateTimeRange = (time_range: UserTopArtistsAndTracksTimeRange) => void

export interface Hook{
    (): ContextProps
}

export const timingFade = 650
export const minAwaitTimingFade = timingFade * 3