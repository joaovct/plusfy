import { useCallback, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { IToken } from "../../../redux/store/token/types"
import { IStore } from "../../../redux/store/types"
import searchItem, { searchNextItems } from "../../api/webapi/search"

type Hook = <T>() => {
    items: T[] | any[]
    nextURL: string
    setQuery: (query: string) => void
    loadMoreItems: () => void
}

const useSearchItems: Hook = <T>() => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const [items, setItems] = useState<T[] | any[]>([])
    const [query, setQuery] = useState('')
    const [nextURL, setNextURL] = useState<string>('')
    const isMounted = useRef(true)
    
    useEffect(() => {
        return () => {isMounted.current = false}
    },[])

    useEffect(() => {
        async function fetchData(){
            const data = await searchItem(accessToken, query,'track')
            for(let key in data){
                if(data[key] && isMounted.current){
                    const newItems = data[key]?.items
                    if(newItems){
                        setItems([...newItems])
                        setNextURL(data.tracks?.next || '')
                    }
                }
            }
        }
        if(accessToken && query){
            fetchData()
        }
    },[accessToken, query])

    const loadMoreItems = useCallback(async () => {
        if(nextURL){
            const data = await searchNextItems(accessToken, nextURL, {limit: 40})
            for(let key in data){
                if(data[key]){
                    const newItems = data[key]?.items
                    if(newItems && isMounted.current){
                        setItems(old => [...old, ...newItems])
                        setNextURL(data[key]?.next || '')
                    }
                }
            }
        }
    },[nextURL, accessToken])

    return {items, nextURL, setQuery, loadMoreItems}
}

export default useSearchItems