import React, { useEffect, useState } from 'react'
import { Title, SeeMore } from '../../styles/style'
import { ChildProps } from './types'
import {Switch, Route, Link} from 'react-router-dom'
import useSearchItems from '../../common/hooks/components/search/useSearchItems'
import { Playlist } from '../../common/api/webapi/types'
import ListPlaylists from '../common/listPlaylists/ListPlaylists'
import {Content, WrapperListItens} from './style'

const SearchPlaylists: React.FC<ChildProps> = ({query}) => {
    const {items: playlists, nextURL, setQuery, loadMoreItems} = useSearchItems<Playlist>({typeSearch: 'playlist'})
    const [slicedPlaylists, setSlicedPlaylists] = useState(playlists.slice(0, 5))

    useEffect(() => {
        setQuery(query)
    },[setQuery, query])

    useEffect(() => {
        const n = window.innerWidth >= 1200 ? 10 : window.innerWidth >= 991 ? 8 : window.innerWidth >= 768 ? 6 : 4
        setSlicedPlaylists([...playlists.slice(0,n)])
    },[playlists])

    return(
        <>
            {
                playlists.length ?
                <Content>
                    <Title>Playlists</Title>
                    <Switch>
                        <Route exact path={`/search/:q/playlists`}>
                            <WrapperListItens>
                                <ListPlaylists playlists={playlists}/>
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
                                <ListPlaylists playlists={slicedPlaylists}/>
                            </WrapperListItens>
                            <SeeMore>
                                <Link to={`/search/${query}/playlists`}>
                                    Ver tudo
                                </Link>
                            </SeeMore>
                        </Route>
                    </Switch>
                </Content>
                : <></>
            }
        </>
    )
}

export default SearchPlaylists
