import { Track } from "../../common/api/webapi/types";
import { TimeRange, UpdateTimeRange } from "../../common/hooks/components/mood/types";

export interface ContextProps {
    status: Status
    timeRange: TimeRange
    results: Results | null
    loadMood: () => void
    resetMood: () => void
    updateTimeRange: UpdateTimeRange
}

export type Status = "initial" | "loading" | "success" | "reseting" | "error"

export type Mood = "" | "dancing" | "happy" | "energetic" | "relaxing" | "melancholic" 

export interface Results{
    mood: Mood
    tracks: {
        [key: string]: Track[]
        dancing: Track[]
        happy: Track[]
        energetic: Track[]
        relaxing: Track[]
        melancholic: Track[]
    }
}