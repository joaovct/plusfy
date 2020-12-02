import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import searchItem from '../../../common/api/webapi/search'
import { Track } from '../../../common/api/webapi/types'
import { IToken } from '../../../redux/store/token/types'
import { IStore } from '../../../redux/store/types'
import { Title, metrics } from '../../../styles/style'
import { ChildProps } from '../types'
import ListTracks from '../../common/ListTracks/ListTracks'

const SearchTracks: React.FC<ChildProps> = ({query}) => {
    const [tracks, setTracks] = useState<Track[]>([])
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const isMounted = useRef(true)

    useEffect(() => {
        return () => {isMounted.current = false}
    },[])

    useEffect(() => {
        fetchData()
        async function fetchData(){
            const data = await searchItem(accessToken, query,'track')
            if(data.tracks && isMounted.current)
                setTracks([...data.tracks.items.slice(0, 5)])
        }
    },[tracks, accessToken, query])

    return(
        <>
            {
                tracks.length ?
                <Content>
                    <Title>Músicas</Title>
                    <WrapperTracks>
                        <ListTracks tracks={tracks.slice(0,5)}/>
                    </WrapperTracks>
                </Content>
                : <></>
            }
        </>
    )
}

export default SearchTracks

const WrapperTracks = styled.div`
    margin: ${metrics.spacing3} 0 0 0;
`

const Content = styled.div`
    ${Title}{
        font-size: 30px;
    }
`