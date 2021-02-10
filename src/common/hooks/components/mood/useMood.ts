import { useState } from 'react'
import { AudioFeature, Track } from '../../../api/webapi/types'
import { Hook, minAwaitTimingFade, UpdateTimeRange, TimeRange } from './types'
import { Status, Results, Mood } from '../../../../components/mood/types'
import { IToken } from '../../../../redux/store/token/types'
import { useSelector } from 'react-redux'
import { IStore } from '../../../../redux/store/types'
import { getAllFavoriteTracksByRange } from '../../../helpers/helperMood'
import { getAudioFeatures } from '../../../api/webapi/track'
import _ from 'lodash'


interface Features{
    audio_features: AudioFeature[];
}

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

        let tracks: Track[] = []
        let features: Features = {audio_features: []}

        if(timeRange === 'all_combined'){
            tracks = [...tracks, ...await getAllFavoriteTracksByRange(accessToken, "long_term")]
            tracks = [...tracks, ...await getAllFavoriteTracksByRange(accessToken, "medium_term")]
            tracks = [...tracks, ...await getAllFavoriteTracksByRange(accessToken, "short_term")]

            tracks = tracks.filter((track, n) => {
                let include = true

                for(let i = 0; i < n; i++){
                    if(!track || (track.uri === tracks[i]?.uri)){
                        include = false
                    }
                }
                return include
            })

            const chunks = _.chunk(tracks, 99)

            for(let i = 0; i < chunks.length; i++){
                const newAudioFeatures = (await getAudioFeatures(accessToken, chunks[i].map(track => track?.id || ''))).audio_features
                features.audio_features = [...features.audio_features, ...newAudioFeatures]
            }
            
        }else{
            tracks = await getAllFavoriteTracksByRange(accessToken, timeRange)
            features = await getAudioFeatures(accessToken, tracks.map(track => track?.id || ''))
        }

        let happy: Track[] = []
        let energetic: Track[] = []
        let dancing: Track[] = []
        let relaxing: Track[] = []
        let melancholic: Track[] = []

        features.audio_features.forEach(item => {
            const track = tracks.find(track => track?.id === item.id)

            if(track){
                if(item.valence < .3 && item.energy < .4)
                    melancholic = [...melancholic, track]
                if(item.energy > .4 && item.valence > .75)
                    happy = [...happy, track]
                if(item.energy > .8)
                    energetic = [...energetic, track]
                if(item.valence > .4 && item.danceability > .75)
                    dancing = [...dancing, track]
                if(item.valence > .3 && item.energy < .4){
                    relaxing = [...relaxing, track]
                }
            }
        })

        let mood: Mood = ''

        if(happy.length >= energetic.length && happy.length >= dancing.length && happy.length >= relaxing.length && happy.length >= melancholic.length)
            mood = 'happy'
        else if(energetic.length >= happy.length && energetic.length >= dancing.length && energetic.length >= relaxing.length && energetic.length >= melancholic.length)
            mood = 'energetic'
        else if(dancing.length >= happy.length && dancing.length >= energetic.length && dancing.length >= relaxing.length && dancing.length >= melancholic.length)
            mood = 'dancing'
        else if(relaxing.length >= happy.length && relaxing.length >= energetic.length && relaxing.length >= dancing.length && relaxing.length >= melancholic.length)
            mood = 'relaxing'
        else
            mood = 'melancholic'
        
        setTimeout(() => {
            if(mood){
                setStatus('success')
                return setResults({mood, tracks: {happy, energetic, dancing, relaxing, melancholic}})
            }
            setStatus('error')
            return setResults(null)
        }, minAwaitTimingFade)
    }

    const resetMood = () => {}

    return {status, timeRange, updateTimeRange, loadMood, resetMood, results}
}

export default useMood