import { useContext } from 'react'
import {AddPlaylistContext} from '../providers/AddPlaylistProvider'

const useAddPlaylist = () => useContext(AddPlaylistContext)

export default useAddPlaylist