import { useState } from 'react'
import { Track, UserTopArtistsAndTracksTimeRange as TimeRange } from '../../../api/webapi/types'
import { Hook, minAwaitTimingFade, UpdateTimeRange } from './types'
import { Status, Results, Mood } from '../../../../components/mood/types'
import { IToken } from '../../../../redux/store/token/types'
import { useSelector } from 'react-redux'
import { IStore } from '../../../../redux/store/types'
import { getAllFavoriteTracksByRange } from '../../../helpers/helperMood'
import { getAudioFeatures } from '../../../api/webapi/track'

const useMood: Hook = () => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const [status, setStatus] = useState<Status>('initial')
    const [timeRange, setTimeRange] = useState<TimeRange>('short_term')
    const [results, setResults] = useState<Results | null>(null)

    const updateTimeRange: UpdateTimeRange = (timeRange) => {
        setTimeRange(timeRange)
    }

    const loadMood = async () => {
        setStatus('loading')

        const tracks = await getAllFavoriteTracksByRange(accessToken, timeRange)
        const features = await getAudioFeatures(accessToken, tracks.map(track => track?.id || ''))

        let happy: Track[] = []
        let energetic: Track[] = []
        let dancing: Track[] = []
        let relaxing: Track[] = []
        let mellow: Track[] = []

        features.audio_features.forEach(item => {
            const track = tracks.find(track => track?.id === item.id)

            if(track){
                if(item.valence < .3 && item.energy < .6)
                    mellow = [...mellow, track]
                if(item.valence > .6 && item.energy > .3)
                    happy = [...happy, track]
                if(item.energy > .7)
                    energetic = [...energetic, track]
                if(item.danceability > .7)
                    dancing = [...dancing, track]
                if(item.valence > .3 && item.energy < .4){
                    relaxing = [...relaxing, track]
                }
            }
        })

        let mood: Mood = ''
        
        if(happy.length >= energetic.length && happy.length >= dancing.length && happy.length >= relaxing.length && happy.length >= mellow.length)
            mood = 'happy'
        else if(energetic.length >= happy.length && energetic.length >= dancing.length && energetic.length >= relaxing.length && energetic.length >= mellow.length)
            mood = 'energetic'
        else if(dancing.length >= happy.length && dancing.length >= energetic.length && dancing.length >= relaxing.length && dancing.length >= mellow.length)
            mood = 'dancing'
        else if(relaxing.length >= happy.length && relaxing.length >= energetic.length && relaxing.length >= dancing.length && relaxing.length >= mellow.length)
            mood = 'relaxing'
        else
            mood = 'mellow'
        
        setTimeout(() => {
            if(mood){
                setStatus('success')
                return setResults({mood, tracks: {happy, energetic, dancing, relaxing, mellow}})
            }
            setStatus('error')
            return setResults(null)
        }, minAwaitTimingFade)
    }

    const resetMood = () => {}

    return {status, timeRange, updateTimeRange, loadMood, resetMood, results}
}

export default useMood