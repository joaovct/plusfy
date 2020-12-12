import React, { useEffect } from 'react'
import { Track } from '../../../common/api/webapi/types'
import useFavoriteItems from '../../../common/hooks/components/favorites/useFavoriteItems'
import ListTracks from '../../common/listTracks/ListTracks'
import {ChildProps} from '../types'
import {ListContent,additionalCSS} from '../style'
import { SeeMore, Title, Text } from '../../../styles/style'
import {MessageStatus} from '../style'
import {Loader, XCircle as Error} from 'react-feather'

const FavoriteTracks: React.FC<ChildProps> = ({timeRange}) => {
    const {items: tracks, setTimeRange,nextURL,loadMoreItems,status} = useFavoriteItems<Track>('tracks')

    useEffect(() => {
        setTimeRange(timeRange)
    },[timeRange, setTimeRange])

    return(
        <>
            {
                tracks?.length
                ? <ListContent>
                    <Title>Músicas favoritas</Title>
                    <ListTracks
                        tracks={tracks}
                        viewMode="simplified"
                        showHeader={false}
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
                    <Text>Tivemos um problema ao carregar <br/> suas músicas favoritas.</Text>
                </MessageStatus>
            }
        </>
    )
}

export default FavoriteTracks