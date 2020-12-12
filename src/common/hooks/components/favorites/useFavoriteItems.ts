import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IToken } from "../../../../redux/store/token/types";
import { IStore } from "../../../../redux/store/types";
import { getNextUserTopArtistsAndTracks, getUserTopArtistsAndTracks } from "../../../api/webapi/personalization";
import { UserTopArtistsAndTracksTimeRange, UserTopArtistsAndTracksType, UserTopArtistsAndTracksConfigs} from "../../../api/webapi/types";

type Status = 'success' | 'loading' | 'error'

type Hook = <T>(type: UserTopArtistsAndTracksType) => {
    items: T[] | any[]
    nextURL: string
    setTimeRange: (query: UserTopArtistsAndTracksTimeRange) => void
    loadMoreItems: () => void
    status: Status
}

const useFavoriteItems: Hook = <T>(type: UserTopArtistsAndTracksType) => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const [items, setItems] = useState<T[] | any[]>([])
    const [nextURL, setNextURL] = useState('')
    const [timeRange, setTimeRange] = useState<UserTopArtistsAndTracksTimeRange>('long_term')
    const [status, setStatus] = useState<Status>('loading')
    const isMounted = useRef(true) 

    useEffect(() => () => {isMounted.current = false},[])

    useEffect(() => {
        async function fetchData(){
            const data = await getUserTopArtistsAndTracks<T>(accessToken, type, {time_range: timeRange})
            setItems([...data?.items || []])
            setNextURL(data?.next || '')
            if(data?.items)
                return setStatus('success')
            setStatus('error')
        }
        if(accessToken)
            fetchData()
    },[accessToken, type, timeRange])

    const loadMoreItems = useCallback(async (configs?: UserTopArtistsAndTracksConfigs) => {
        if(nextURL){
            const requestConfigs: UserTopArtistsAndTracksConfigs = {time_range: configs?.time_range || timeRange, limit: configs?.limit, offset: configs?.offset}
            const data = await getNextUserTopArtistsAndTracks(accessToken,nextURL,requestConfigs)
            setItems([...items, ...data?.items || []])
            setNextURL(data?.next || '')
            if(data?.items)
                return setStatus('success')
            setStatus('error')
        }
    },[nextURL, accessToken, timeRange, items])

    return {items, nextURL, setTimeRange, loadMoreItems, status}
}

export default useFavoriteItems