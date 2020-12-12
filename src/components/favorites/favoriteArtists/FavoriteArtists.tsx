import React, { useEffect } from 'react'
import { Artist } from '../../../common/api/webapi/types'
import useFavoriteItems from '../../../common/hooks/components/favorites/useFavoriteItems'
import { SeeMore, Title, Text } from '../../../styles/style'
import {MessageStatus} from '../style'
import ListArtists from '../../common/listArtists/ListArtists'
import { ChildProps } from '../types'
import {ListContent, additionalCSS} from '../style'
import {Loader, XCircle as Error} from 'react-feather'

const FavoriteArtists: React.FC<ChildProps> = ({timeRange}) => {
    const {items: artists, setTimeRange, loadMoreItems, nextURL, status} = useFavoriteItems<Artist>('artists')

    useEffect(() => {
        setTimeRange(timeRange)
    },[timeRange, setTimeRange])

    return(
        <>
            {
                artists?.length
                ? <ListContent>
                    <Title>Artistas favoritos</Title>
                    <ListArtists
                        artists={artists}
                        additionalCSS={additionalCSS}
                    />
                    {
                        nextURL ?
                        <SeeMore>
                            <span onClick={loadMoreItems}>Ver mais</span>
                        </SeeMore>
                        : <></>
                    }
                </ListContent>
                : status === 'loading'
                ? <MessageStatus status={status}>
                    <Loader/>
                </MessageStatus>
                : <MessageStatus status={status}>
                    <Error/>
                    <Text>Tivemos um problema ao carregar <br/> seus artistas favoritos.</Text>
                </MessageStatus>
            }
        </>
    )
}

export default FavoriteArtists