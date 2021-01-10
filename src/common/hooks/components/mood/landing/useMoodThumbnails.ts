import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { IToken } from "../../../../../redux/store/token/types"
import { IStore } from "../../../../../redux/store/types"
import { getUserTopArtistsAndTracks } from "../../../../api/webapi/personalization"
import { Track, UserTopArtistsAndTracksTimeRange } from "../../../../api/webapi/types"
import { ThumbnailTrack } from "./types"

type UpdateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => void

interface Hook{
    (): {
        updateSelect: UpdateSelect
        thumbnailsTracks: ThumbnailTrack[]
    }
}

const useMoodThumbnails: Hook = () => {
    const [timeRange, setTimeRange] = useState<UserTopArtistsAndTracksTimeRange>('medium_term')
    const [thumbnailsTracks, setThumbnailTracks] = useState<ThumbnailTrack[]>([])
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const isMounted = useRef(true)

    useEffect(() => () => {
        isMounted.current = false
    },[isMounted])

    useEffect(() => {
        if(accessToken){
            fetchData()
            getUserTopArtistsAndTracks(accessToken, "tracks", {time_range: timeRange})
        }
        async function fetchData(){
            const data = await getUserTopArtistsAndTracks<Track>(accessToken, "tracks", {time_range: timeRange})
            if(isMounted.current && data.items){
                const nItems = 6
                let tracks: ThumbnailTrack[] = []
                for(let i = 0; i < nItems; i++){
                    let alreadyUsed = true
                    do{
                        const index = Math.floor(Math.random() * (data.items.length))
                        alreadyUsed = !tracks.every(track => data.items[index]?.album.images[0] && data.items[index]?.album.images[0].url && track.imgSrc !== data.items[index]?.album.images[0].url)
                        if(!alreadyUsed){
                            const track = {name: data.items[index]?.name || '', imgSrc: data.items[index]?.album.images[0].url || ''}
                            tracks = [...tracks, track]
                        }
                    }while(alreadyUsed)
                }
                setThumbnailTracks(tracks)
            }
        }
    },[timeRange, accessToken])

    const updateSelect: UpdateSelect = (e) => {
        if(e.target.value === "long_term" || e.target.value === "medium_term" || e.target.value === "short_term"){
            setTimeRange(e.target.value)
        }
    }

    return {
        updateSelect,
        thumbnailsTracks
    }
}

export default useMoodThumbnails