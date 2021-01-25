import { Mood } from "../../components/mood/types";
import { getNextUserTopArtistsAndTracks, getUserTopArtistsAndTracks } from "../api/webapi/personalization";
import { Track, UserTopArtistsAndTracksTimeRange } from "../api/webapi/types";
import iconDancing from '../../assets/mood/dancing-animation.webm'
import iconEnergetic from '../../assets/mood/energetic-animation.webm'
import iconHappy from '../../assets/mood/happy-animation.webm'
import iconMellow from '../../assets/mood/mellow-animation.webm'
import iconRelaxing from '../../assets/mood/relaxing-animation.webm'

type GetAllFavoriteTracksByRange = (accessToken: string, timeRange: UserTopArtistsAndTracksTimeRange) => Promise<Track[]>

export const getAllFavoriteTracksByRange: GetAllFavoriteTracksByRange = async (accessToken, timeRange) => {
    let tracks: Track[] = []

    let data = await getUserTopArtistsAndTracks<Track>(accessToken, 'tracks', { time_range: timeRange })
    tracks = [...(data?.items ? data?.items : [])]

    if(data?.next){
        let next: string = data.next
    
        do{
            let newData = await getNextUserTopArtistsAndTracks<Track>(accessToken, next, { time_range: timeRange })
            tracks = [...tracks, ...(newData?.items ? newData?.items : [])]
            next = newData?.next ? newData?.next : ""        
        }while(next)
    }

    return tracks
}

export const getMoodAnimation = (mood: Mood): string => {
    if(mood === 'dancing')
        return iconDancing
    else if(mood === 'energetic')
        return  iconEnergetic
    else if(mood === 'happy')
        return iconHappy
    else if(mood === 'mellow')
        return iconMellow
    else if(mood === 'relaxing')
        return iconRelaxing
    return ''
}

export const getMoodTitle = (mood: Mood): string => {
    if(mood === 'dancing')
        return 'Dançante'
    else if(mood === 'energetic')
        return 'Energético'
    else if(mood === 'happy')
        return 'Alegre'
    else if(mood === 'mellow')
        return 'Melancólico'
    else if(mood === 'relaxing')
        return 'Calmo'
    return ''
}

export const getMoodDescription = (mood: Mood): string => {
    if(mood === 'dancing')
        return `
            A maioria das suas músicas tem uma sonoridade muito animada para uma boa dança.
            É bem provável não consiga se segurar e comece a dançar enquanto escuta suas músicas.
        `
    else if(mood === 'energetic')
        return `

        `
    else if(mood === 'happy')
        return `

        `
    else if(mood === 'mellow')
        return `
        
        `
    else if(mood === 'relaxing')
        return `
        
        `

    return ''
}