import { UserTopArtistsAndTracksTimeRange } from "../../common/api/webapi/types";
import { UpdateTimeRange } from "../../common/hooks/components/mood/types";

export interface ContextProps {
    status: Status
    timeRange: UserTopArtistsAndTracksTimeRange
    results: Results
    loadMood: () => void
    resetMood: () => void
    updateTimeRange: UpdateTimeRange
}

export type Status = "initial" | "loading" | "success" | "reseting" | "error"

export interface Results{

}