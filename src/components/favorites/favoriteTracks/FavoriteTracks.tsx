import React, { useEffect } from 'react'
import { Track } from '../../../common/api/webapi/types'
import useFavoriteItems from '../../../common/hooks/components/favorites/useFavoriteItems'
import ListTracks from '../../common/listTracks/ListTracks'
import {ChildProps} from '../types'
import {ListContent,additionalCSS} from '../style'
import { Title } from '../../../styles/style'

const FavoriteTracks: React.FC<ChildProps> = ({timeRange}) => {
    const {items: tracks, setTimeRange} = useFavoriteItems<Track>('tracks')

    useEffect(() => {
        setTimeRange(timeRange)
    },[timeRange, setTimeRange])

    return(
        <ListContent>
            <Title>Músicas favoritas</Title>
            <ListTracks
                tracks={tracks}
                viewMode="simplified"
                additionalCSS={`li:nth-child(1){display: none;} ${additionalCSS}`}
            />
        </ListContent>
    )
}

export default FavoriteTracks