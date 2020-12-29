import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { IToken } from "../../../../redux/store/token/types"
import { IStore } from "../../../../redux/store/types"
import searchItem, { searchNextItems } from "../../../api/webapi/search"
import {SearchResult, SearchTypes} from "../../../api/webapi/types"

type HookProps = {
    typeSearch: SearchTypes
}

type Hook = <T>(props: HookProps) => {
    items: T[] | any[]
    nextURL: string
    setQuery: (query: string) => void
    loadMoreItems: () => void
}

const useSearchItems: Hook = <T>({typeSearch}: HookProps) => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const [items, setItems] = useState<T[] | any[]>([])
    const [query, setQuery] = useState('')
    const [nextURL, setNextURL] = useState<string>('')
    const isMounted = useRef(true)

    useEffect(() => {
        return () => {isMounted.current = false}
    },[])

    useEffect(() => {
        if(accessToken && query)
            fetchData()

        async function fetchData(){
            const data = await searchItem(accessToken, query, typeSearch)
            const {items, next} = loopFindItems(data)
            setItems([...items])
            setNextURL(next)
        }
    },[accessToken, query, typeSearch])

    function loopFindItems(data: SearchResult){
        const items = Object.keys(data).map(key => data[key])[0]
        return {
            items: items?.items || [],
            next: items?.next || ''
        }
    }

    const loadMoreItems = () => {
        if(accessToken)
            fetchData()
        
        async function fetchData(){
            const data = await searchNextItems(accessToken, nextURL, {limit: 40})
            const {items, next} = loopFindItems(data)
            setItems(currentItems => [...currentItems, ...items])
            setNextURL(next)
        }
    }

    return {items, nextURL, setQuery, loadMoreItems}
}

export default useSearchItems