import { Track, UserTopArtistsAndTracksTimeRange } from "../../common/api/webapi/types";
import { UpdateTimeRange } from "../../common/hooks/components/mood/types";

export interface ContextProps {
    status: Status
    timeRange: UserTopArtistsAndTracksTimeRange
    results: Results | null
    loadMood: () => void
    resetMood: () => void
    updateTimeRange: UpdateTimeRange
}

export type Status = "initial" | "loading" | "success" | "reseting" | "error"

export type Mood = "" | "dancing" | "happy" | "energetic" | "relaxing" | "mellow" 

export interface Results{
    [key: string]: Mood | Track[]
    mood: Mood
    dancing: Track[]
    happy: Track[]
    energetic: Track[]
    relaxing: Track[]
    mellow: Track[]
}