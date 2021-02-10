import { ContextProps } from "../../../../components/mood/types"
import { UserTopArtistsAndTracksTimeRange } from "../../../api/webapi/types"

export type TimeRange = (UserTopArtistsAndTracksTimeRange) | 'all_combined'
export type UpdateTimeRange = (time_range: TimeRange) => void

export interface Hook{
    (): ContextProps
}

export const timingFade = 650
export const minAwaitTimingFade = timingFade * 3