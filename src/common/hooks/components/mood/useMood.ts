import { useState } from 'react'
import { UserTopArtistsAndTracksTimeRange as TimeRange } from '../../../api/webapi/types'
import { Hook, minAwaitTimingFade, UpdateTimeRange } from './types'
import { Status, Results } from '../../../../components/mood/types'

const useMood: Hook = () => {
    const [status, setStatus] = useState<Status>('initial')
    const [timeRange, setTimeRange] = useState<TimeRange>('short_term')
    const [results] = useState<Results>({})

    const updateTimeRange: UpdateTimeRange = (timeRange) => {
        setTimeRange(timeRange)
    }

    const loadMood = () => {
        setStatus('loading')
        setTimeout(() => {
            setStatus('success')
            setTimeout(() => {
                setStatus('initial')
            }, minAwaitTimingFade * 3)
        }, minAwaitTimingFade * 3)
        // minimu
    }

    const resetMood = () => {}

    return {status, timeRange, updateTimeRange, loadMood, resetMood, results}
}

export default useMood