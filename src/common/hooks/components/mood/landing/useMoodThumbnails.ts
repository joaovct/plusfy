import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { IToken } from "../../../../../redux/store/token/types"
import { IStore } from "../../../../../redux/store/types"
import { getUserTopArtistsAndTracks } from "../../../../api/webapi/personalization"
import { Artist, Track } from "../../../../api/webapi/types"
import { TimeRange } from "../types"
import useMoodContext from "../useMoodContext"
import { ThumbnailTrack } from "./types"

type UpdateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => void

interface Hook{
    (): {
        updateSelect: UpdateSelect
        tracksImages: ThumbnailTrack[],
        artistsImages: string[]

    }
}

const useMoodThumbnails: Hook = () => {
    const {updateTimeRange} = useMoodContext()
    const [timeRange, setTimeRange] = useState<TimeRange>('medium_term')
    const [tracksImages, setTracksImages] = useState<ThumbnailTrack[]>([])
    const [artistsImages, setArtistsImages] = useState<string[]>([])
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const isMounted = useRef(true)

    useEffect(() => () => {
        isMounted.current = false
    },[isMounted])

    useEffect(() => {
        if(accessToken){
            fetchTracks(6)
        }
        async function fetchTracks(numberImages: number){
            const data = await getUserTopArtistsAndTracks<Track>(accessToken, "tracks", {time_range: timeRange === 'all_combined' ? "short_term" : timeRange})
            if(isMounted.current && data?.items){
                let tracks: ThumbnailTrack[] = []
                numberImages = numberImages > data?.items.length ? data?.items.length : numberImages

                for(let i = 0; i < numberImages; i++){
                    let alreadyUsed = true
                    do{
                        const index = Math.floor(Math.random() * (data?.items.length))
                        alreadyUsed = !tracks.every(track => data?.items[index]?.album.images[0] && data?.items[index]?.album.images[0].url && track.imgSrc !== data?.items[index]?.album.images[0].url)
                        if(!alreadyUsed){
                            const track = {name: data?.items[index]?.name || '', imgSrc: data?.items[index]?.album.images[0].url || ''}
                            tracks = [...tracks, track]
                        }
                    }while(alreadyUsed)
                }
                setTracksImages(tracks)
            }
        }
    },[timeRange, accessToken])

    useEffect(() => {
        if(accessToken){
            fetchArtists(6)
        }
        async function fetchArtists(numberImages: number){
            const data = await getUserTopArtistsAndTracks<Artist>(accessToken, "artists", {time_range: "short_term"})
            if(isMounted.current && data?.items){
                let artists: string[] = []
                numberImages = numberImages > data?.items.length ? data?.items.length : numberImages
                for(let i = 0; i < numberImages; i++){
                    let alreadyUsed = true
                    do{
                        const index = Math.floor(Math.random() * (data?.items.length))
                        alreadyUsed = !artists.every(artist => data?.items[index]?.images[0] && data?.items[index]?.images[0].url && artist !== data?.items[index]?.images[0].url)
                        if(!alreadyUsed){
                            const artist = data?.items[index].images[0].url
                            artists = [...artists, artist]
                        }
                    }while(alreadyUsed)
                }
                setArtistsImages(artists)
            }
        }
    },[accessToken])

    const updateSelect: UpdateSelect = (e) => {
        if(
            e.target.value === "long_term" || e.target.value === "medium_term" ||
            e.target.value === "short_term" || e.target.value === "all_combined"
        ){
            setTimeRange(e.target.value)
            updateTimeRange(e.target.value)
        }
    }

    return {
        updateSelect,
        tracksImages,
        artistsImages
    }
}

export default useMoodThumbnails