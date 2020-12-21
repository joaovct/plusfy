import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { IToken } from "../../../../redux/store/token/types"
import { IStore } from "../../../../redux/store/types"
import { Playlist } from "../../../api/webapi/types"
import { fetchUserPlaylists, addItemsToPlaylist,Status as RequestStatus } from "../../../api/webapi/playlists"
import { AddToPlaylistContext } from "../../../providers/AddToPlaylistProvider"
import useAlert from "../alert/useAlert"
import useModal from "../modal/useModal"

type AddToPlaylist = (playlistId: string) => Promise<void>

type Hook = () => {
    show: boolean
    closeModal: () => void
    playlists: Playlist[]
    cssPreparer: string
    addToPlaylist: AddToPlaylist
}

const useAddToPlaylistLogic: Hook = () => {
    const {status: modalStatus, cssPreparer, showModal, closeModal} = useModal({transition_ms: 250})
    const {executeCallback, status} = useContext(AddToPlaylistContext)
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const createAlert = useAlert()
    const [requestStatus, setRequestStatus] = useState<RequestStatus | ''>('')
    const [playlists, setPlaylists] = useState<Playlist[]>([])
    const [itemsAdded, setItemsAdded] = useState<boolean | null>(null)
    const [show, setShow] = useState(false)
    const isMounted = useRef(true)


    useEffect(() => () => {isMounted.current = false}, [])

    useEffect(() => {
        if(status?.state === 'adding' && accessToken){
            fetchData()
            showModal()
        }

        async function fetchData(){
            const response = await fetchUserPlaylists(accessToken)
            if(isMounted.current){
                setRequestStatus(response.status)
                setPlaylists(response.items)
            }
        }
    //eslint-disable-next-line
    },[status, accessToken, isMounted])

    const addToPlaylist = useCallback<AddToPlaylist>(async (playlistId) => {
        if(status){
            const res = await addItemsToPlaylist(accessToken, {playlistId, uris: status.uris})
            setItemsAdded(res?.snapshot_id ? true : false)
        }
    },[status, accessToken])

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

    useEffect(() => {
        if(status?.state === 'adding' && requestStatus === 'success' && modalStatus === 'show')
            return setShow(true)
        setShow(false)
    },[status, requestStatus, modalStatus])

    const handleCreateAlert = useCallback(() => {
        const messagePlural = status?.uris.length || 0 > 1

        if(itemsAdded === true){
            const message = messagePlural ? 'Música adicionada à playlist 🎉' : 'Músicas adicionadas à playlist 🎉'
            createAlert('normal', message)
        }else if(itemsAdded === false){
            const message = messagePlural ? 'Ocorreu um erro ao adicionar as músicas à playlist.' : 'Ocorreu um erro ao adicionar a música à playlist.'
            createAlert('error', message)
        }
    },[createAlert, status, itemsAdded])

    return {show, closeModal, playlists, cssPreparer, addToPlaylist}
}

export default useAddToPlaylistLogic