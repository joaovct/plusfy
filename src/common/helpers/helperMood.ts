import { Mood } from "../../components/mood/types";
import { getNextUserTopArtistsAndTracks, getUserTopArtistsAndTracks } from "../api/webapi/personalization";
import { Track, UserTopArtistsAndTracksTimeRange } from "../api/webapi/types";
import animationDancing from '../../assets/mood/dancing-animation.webm'
import animationEnergetic from '../../assets/mood/energetic-animation.webm'
import animationHappy from '../../assets/mood/happy-animation.webm'
import animationMellow from '../../assets/mood/mellow-animation.webm'
import animationRelaxing from '../../assets/mood/relaxing-animation.webm'
import iconDancing from '../../assets/mood/dancing-icon.png'
import iconEnergetic from '../../assets/mood/energetic-icon.png'
import iconHappy from '../../assets/mood/happy-icon.png'
import iconMellow from '../../assets/mood/mellow-icon.png'
import iconRelaxing from '../../assets/mood/relaxing-icon.png'
import emptyAlbumPhoto from '../../assets/empty-playlist-photo.svg'
import _ from 'lodash'

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
        return animationDancing
    else if(mood === 'energetic')
        return  animationEnergetic
    else if(mood === 'happy')
        return animationHappy
    else if(mood === 'mellow')
        return animationMellow
    else if(mood === 'relaxing')
        return animationRelaxing
    return ''
}

export const getMoodIcon = (mood: Mood): string => {
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

export const getFormattedThumbnails = (tracks: Track[], length: number) => {
    let thumbnails: string[] = []
    tracks = _.shuffle(tracks)

    tracks.forEach(track => {
        if(track && track.album && track.album.images[0]){
            const url = track.album.images[0].url

            if(!thumbnails.find(thumbnail => url === thumbnail)){
                thumbnails = [...thumbnails, url]
            }
        }
    })

    while(thumbnails.length < length){
        thumbnails = [...thumbnails, emptyAlbumPhoto]
    }
    

    return thumbnails.slice(0, length)
}