import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IToken } from "../../../../redux/store/token/types";
import { IStore } from "../../../../redux/store/types";
import { getNextUserTopArtistsAndTracks, getUserTopArtistsAndTracks } from "../../../api/webapi/personalization";
import { UserTopArtistsAndTracksTimeRange, UserTopArtistsAndTracksType, UserTopArtistsAndTracksConfigs} from "../../../api/webapi/types";

type Hook = <T>(type: UserTopArtistsAndTracksType) => {
    items: T[] | any[]
    nextURL: string
    setTimeRange: (query: UserTopArtistsAndTracksTimeRange) => void
    loadMoreItems: () => void
}

const useFavoriteItems: Hook = <T>(type: UserTopArtistsAndTracksType) => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const [items, setItems] = useState<T[] | any[]>([])
    const [nextURL, setNextURL] = useState('')
    const [timeRange, setTimeRange] = useState<UserTopArtistsAndTracksTimeRange>('long_term')
    const isMounted = useRef(true) 

    useEffect(() => () => {isMounted.current = false},[])

    useEffect(() => {
        async function fetchData(){
            const data = await getUserTopArtistsAndTracks<T>(accessToken, type, {time_range: timeRange})
            setItems([...data?.items || []])
            setNextURL(data?.next || '')
        }
        if(accessToken)
            fetchData()
    },[accessToken, type, timeRange])

    const loadMoreItems = useCallback(async (configs?: UserTopArtistsAndTracksConfigs) => {
        if(nextURL){
            const data = await getNextUserTopArtistsAndTracks(accessToken,nextURL,{time_range: timeRange, ...configs})
            setItems([...data?.items || []])
            setNextURL(data?.next || '')
        }
    },[nextURL, accessToken, timeRange])

    return {items, nextURL, setTimeRange, loadMoreItems}
}

export default useFavoriteItems