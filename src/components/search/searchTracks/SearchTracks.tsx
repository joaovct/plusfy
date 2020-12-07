import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Track } from '../../../common/api/webapi/types'
import { Title, Text, metrics, colors } from '../../../styles/style'
import { ChildProps } from '../types'
import ListTracks from '../../common/ListTracks/ListTracks'
import {Switch, Route, Link} from 'react-router-dom'
import useSearchItems from '../../../common/hooks/components/useSearchItems'

const SearchTracks: React.FC<ChildProps> = ({query}) => {
    const {items: tracks, nextURL, setQuery, loadMoreItems} = useSearchItems<Track>()
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
                            <WrapperTracks>
                                <ListTracks tracks={tracks}/>
                            </WrapperTracks>
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
                            <WrapperTracks>
                                <ListTracks tracks={firstFiveTracks}/>
                            </WrapperTracks>
                            <SeeMore>
                                <Link to={`/search/${query}/tracks`}>
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

export default SearchTracks

const SeeMore = styled(Text)`
    display: flex;
    justify-content: center;
    margin: ${metrics.spacing3} 0 0 0;

    a, span{
        text-align: center;
        font-size: 1rem;
        font-weight: 500;
        text-transform: uppercase;
        color: ${colors.gray};
        cursor: pointer;
        transition: color .25s;
        text-decoration: underline;

        &:hover{
            color: ${colors.secondary};
        }
    }
`

const WrapperTracks = styled.div`
    margin: ${metrics.spacing3} 0 0 0;
`

const Content = styled.div`
    ${Title}{
        font-size: 30px;
    }
`