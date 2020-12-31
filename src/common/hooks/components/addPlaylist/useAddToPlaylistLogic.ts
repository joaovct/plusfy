import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { IToken } from "../../../../redux/store/token/types"
import { IStore } from "../../../../redux/store/types"
import { Playlist } from "../../../api/webapi/types"
import { fetchUserPlaylists, addItemsToPlaylist,Status as RequestStatus, createPlaylist } from "../../../api/webapi/playlists"
import { AddToPlaylistContext, Status } from "../../../providers/AddToPlaylistProvider"
import useAlert from "../alert/useAlert"
import useModal from "../modal/useModal"
import { IUser } from "../../../../redux/store/user/types"
import { EndOfLineState } from "typescript"

type AddToPlaylist = (playlistId: string) => Promise<void>

type Hook = () => {
    shouldShow: boolean
    shouldShowCreatePlaylist: boolean
    playlists: Playlist[]
    cssPreparer: string
    addToPlaylist: AddToPlaylist
    status: Status
    closeModal: () => void
    showCreatePlaylist: () => void
    createPlaylist: () => Promise<void>
    inputRef: React.RefObject<HTMLInputElement>
}

const useAddToPlaylistLogic: Hook = () => {
    const {status: modalStatus, cssPreparer, showModal, closeModal} = useModal({transition_ms: 250})
    const {executeCallback, status} = useContext(AddToPlaylistContext)
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const {id: userId} = useSelector<IStore, IUser>(store => store.user)
    const createAlert = useAlert()
    const [requestStatus, setRequestStatus] = useState<RequestStatus | ''>('')
    const [playlists, setPlaylists] = useState<Playlist[]>([])
    const [itemsAdded, setItemsAdded] = useState<boolean | null>(null)
    const [shouldShow, setShouldShow] = useState(false)
    const [shouldShowCreatePlaylist, setShouldShowCreatePlaylist] = useState(false)
    const isMounted = useRef(true)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => () => {
        isMounted.current = false
    }, [])
    
    useEffect(() => {
        if(status?.state === 'adding' && userId){
            if(accessToken && (status?.action === 'add-track' || (status?.action === 'create-playlist' && !status?.configs?.fullCloseCreatePlaylist))){
                fetchData()
            }
            showModal()
        }

        async function fetchData(){
            const response = await fetchUserPlaylists(accessToken)
            if(isMounted.current){
                setRequestStatus(response.status)
                setPlaylists([...response.items.filter(filterUsersPlaylists)])
            }
        }

        function filterUsersPlaylists(playlist: Playlist){
            return playlist.owner?.id === userId
        }
    //eslint-disable-next-line
    },[status, accessToken, isMounted, userId])

    useEffect(() => {
        if(status?.state === 'adding' && modalStatus === 'show'){
            if(requestStatus === 'success' && status?.action === 'add-track'){
                return setShouldShow(true)
            }else if((requestStatus === 'success' && status?.action === 'create-playlist' && !status?.configs?.fullCloseCreatePlaylist) || (status?.action === 'create-playlist' && status?.configs?.fullCloseCreatePlaylist)){
                setShouldShow(true)
                return setShouldShowCreatePlaylist(true)
            }
        }
        setShouldShow(false)
        return setShouldShowCreatePlaylist(false)
    },[status, requestStatus, modalStatus])

    useEffect(() => {
        if(itemsAdded === true){
            executeCallback('success')
        }else if(itemsAdded === false){
            executeCallback('error')
        }

        if(itemsAdded === true || itemsAdded === false){
            closeModal()
            setItemsAdded(null)
            if(status?.configs?.alertAfterTrackAdded === true)
                handleCreateAlert()
        }
    //eslint-disable-next-line
    },[itemsAdded, status])

    const addToPlaylist: AddToPlaylist = async (playlistId) => {
        if(status){
            console.log(status.uris)
            const res = await addItemsToPlaylist(accessToken, {playlistId, uris: status.uris})
            setItemsAdded(res?.snapshot_id ? true : false)
        }
    }  

    const handleCreateAlert = useCallback(() => {
        const messagePlural = status?.uris.length || 0 > 1
        if(itemsAdded === true){
            const message = messagePlural ? 'Música adicionada à playlist 🎉´.' : 'Músicas adicionadas à playlist 🎉.'
            createAlert('normal', message)
        }else if(itemsAdded === false){
            const message = messagePlural ? 'Ocorreu um erro ao adicionar as músicas à playlist.' : 'Ocorreu um erro ao adicionar a música à playlist.'
            createAlert('error', message)
        }
    },[createAlert, status, itemsAdded])

    const handleCloseModal = () => {
        if(status?.action === 'create-playlist' && !status?.configs?.fullCloseCreatePlaylist && shouldShowCreatePlaylist)
            return setShouldShowCreatePlaylist(false)
        return closeModal()
    }

    const showCreatePlaylist = () => {
        if(shouldShow){
            setShouldShowCreatePlaylist(true)
        }
    }

    const handleCreatePlaylist = async () => {
        const name = inputRef.current?.value || `Minha playlist`
        const playlist = await createPlaylist(accessToken, {userId, name})

        if(playlist){
            executeCallback('success')
            if(status?.uris.length){
                return addToPlaylist(playlist.id)
            }
        }else{
            executeCallback('error')
        }
        handleCloseModal()
    }

    return {shouldShow, shouldShowCreatePlaylist, status, playlists, cssPreparer, addToPlaylist, closeModal: handleCloseModal, showCreatePlaylist, createPlaylist: handleCreatePlaylist, inputRef}
}

export default useAddToPlaylistLogic