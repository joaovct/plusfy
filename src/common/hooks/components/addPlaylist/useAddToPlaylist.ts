import { useContext } from 'react'
import {AddToPlaylistContext} from '../../../providers/AddToPlaylistProvider'

const useAddToPlaylist = () => {
    const {addToPlaylist} = useContext(AddToPlaylistContext)

    return addToPlaylist
}

export default useAddToPlaylist