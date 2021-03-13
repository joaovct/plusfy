import React from 'react'
import { formatArtistGenres } from '../../../common/helpers/helperPlaylist'
import { ArtistsTable, ArtistsTableRow } from '../../../styles/style'
import { ListArtistsProps } from './types'
import emptyAlbumPhoto from '../../../assets/empty-playlist-photo.svg'

const ListArtists: React.FC<ListArtistsProps> = ({artists, additionalCSS}) => {
    return(
        <ArtistsTable qntColumns={2} additionalCSS={additionalCSS}>
            {
                artists.map((artist, index) => (
                    <ArtistsTableRow key={`listartistrow-${artist.id}-${index}`}>
                        <div>
                            <span>{index + 1}</span>
                        </div>
                        <div>
                            <img loading="lazy" src={artist.images[0].url || emptyAlbumPhoto} alt={artist.name} />
                            <span>
                                <strong>{artist.name}</strong>
                                <small>{formatArtistGenres(artist.genres)}</small>
                            </span>
                        </div>
                    </ArtistsTableRow>
                ))
            }
        </ArtistsTable>
    )
}

export default ListArtists