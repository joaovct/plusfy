import React from 'react'
import { ListPlaylistsStyled, ListPlaylistsItemStyled } from '../../../styles/style'
import { ListPlaylistsProps } from './types'
import { Link } from 'react-router-dom'
import emptyPlaylistPhoto from '../../../assets/empty-playlist-photo.svg'

const ListPlaylists: React.FC<ListPlaylistsProps> = ({playlists}) => {
    return(
        <ListPlaylistsStyled>
            {
                playlists.map((item, index) => (
                    <ListPlaylistsItemStyled key={`listplaylists${item.uri}${index}`}>
                        <Link to={`/playlist/${item.id}`}>
                            <figure>
                                <img src={item.images.length ? item.images[0].url : emptyPlaylistPhoto} alt={item.name} />
                            </figure>
                        </Link>
                        <span>
                            <Link to={`/playlist/${item.id}`}>
                                <strong>
                                    {item.name}
                                </strong>
                            </Link>
                            <small>De {item.owner.display_name}</small>
                        </span>
                    </ListPlaylistsItemStyled>
                ))
            }
        </ListPlaylistsStyled>
    )
}

export default ListPlaylists