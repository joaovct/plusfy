import React from 'react'
import { ListPlaylistsStyled, ListPlaylistsItemStyled } from '../../../styles/style'
import { ListPlaylistsProps } from './types'
import { Link } from 'react-router-dom'
import emptyPlaylistPhoto from '../../../assets/empty-playlist-photo.svg'

const ListPlaylists: React.FC<ListPlaylistsProps> = ({playlists, actionOnClick}) => {
    return(
        <ListPlaylistsStyled>
            {
                playlists.map((item, index) => {
                    const Figure = <figure> <img src={item.images.length ? item.images[0].url : emptyPlaylistPhoto} alt={item.name} /> </figure>
                    const Strong = <strong>{item.name}</strong>
                    const Small = <small>De {item.owner.display_name}</small>

                    return (
                    <ListPlaylistsItemStyled key={`listplaylists${item.uri}${index}`}>
                        {
                            actionOnClick === 'redirect' || actionOnClick === undefined ?
                            <>
                                <Link to={`/playlist/${item.id}`}>
                                    {Figure}
                                </Link>
                                <span>
                                    <Link to={`/playlist/${item.id}`}>
                                        {Strong}
                                    </Link>
                                    <Link to={`/playlist/${item.id}`}>
                                        {Small}
                                    </Link>
                                </span>
                            </>
                            :
                            <>
                                <div aria-label="button" onClick={() => actionOnClick(item)}>
                                    {Figure}
                                </div>
                                <span>
                                    <div onClick={() => actionOnClick(item)}>
                                        {Strong}
                                    </div>
                                    {Small}
                                </span>
                            </>
                        }
                    </ListPlaylistsItemStyled>
                )})
            }
        </ListPlaylistsStyled>
    )
}

export default ListPlaylists