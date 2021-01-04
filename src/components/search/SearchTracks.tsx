import React, { useEffect, useState } from 'react'
import { Track } from '../../common/api/webapi/types'
import { Title, SeeMore } from '../../styles/style'
import { ChildProps } from './types'
import ListTracks from '../common/listTracks/ListTracks'
import {Switch, Route, Link} from 'react-router-dom'
import useSearchItems from '../../common/hooks/components/search/useSearchItems'
import {Content, WrapperListItens} from './style'

const SearchTracks: React.FC<ChildProps> = ({query}) => {
    const {items: tracks, nextURL, setQuery, loadMoreItems} = useSearchItems<Track>({typeSearch: 'track'})
    const [firstFiveTracks, setFirstFiveTracks] = useState(tracks.slice(0, 5))

    useEffect(() => {
        setQuery(query)
    },[setQuery, query])

    useEffect(() => {
        setFirstFiveTracks([...tracks.slice(0,5)])
    },[tracks])

    return(
        <>
            {
                tracks.length ?
                <Content>
                    <Title>Músicas</Title>
                    <Switch>
                        <Route exact path={`/search/:q/tracks`}>
                            <WrapperListItens>
                                <ListTracks tracks={tracks}/>
                            </WrapperListItens>
                            {
                                nextURL ?
                                <SeeMore>
                                    <span onClick={loadMoreItems}>
                                        Ver mais
                                    </span>
                                </SeeMore>
                                : <></>
                            }
                        </Route>
                        <Route path={`/search/:q`}>
                            <WrapperListItens>
                                <ListTracks tracks={firstFiveTracks}/>
                            </WrapperListItens>
                            {
                                tracks.length > 5 ?
                                <SeeMore>
                                    <Link to={`/search/${query}/tracks`}>
                                        Ver tudo
                                    </Link>
                                </SeeMore>
                                : <></>    
                        }
                        </Route>
                    </Switch>
                </Content>
                : <></>
            }
        </>
    )
}

export default SearchTracks