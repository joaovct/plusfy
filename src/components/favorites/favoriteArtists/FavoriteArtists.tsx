import React, { useEffect } from 'react'
import { Artist } from '../../../common/api/webapi/types'
import useFavoriteItems from '../../../common/hooks/components/favorites/useFavoriteItems'
import { Title } from '../../../styles/style'
import ListArtists from '../../common/listArtists/ListArtists'
import { ChildProps } from '../types'
import {ListContent, additionalCSS} from '../style'


const FavoriteArtists: React.FC<ChildProps> = ({timeRange}) => {
    const {items: artists, setTimeRange} = useFavoriteItems<Artist>('artists')

    useEffect(() => {
        setTimeRange(timeRange)
    },[timeRange, setTimeRange])

    return(
        <ListContent>
            <Title>Artistas favoritos</Title>
            <ListArtists
                artists={artists}
                additionalCSS={additionalCSS}
            />
        </ListContent>
    )
}

export default FavoriteArtists