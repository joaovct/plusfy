import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { HandleSetToggleModal } from "../../../../components/common/nowPlaying/types"
import { ICurrentState } from "../../../../redux/store/currentState/types"
import { IToken } from "../../../../redux/store/token/types"
import { IStore } from "../../../../redux/store/types"
import { fetchPlaylist } from "../../../api/webapi/playlists"
import { Playlist } from "../../../api/webapi/types"
import useModal, {Status} from "../modal/useModal"

interface Hook{
    ({toggleModal, handleSetToggleModal}: {
        toggleModal: boolean
        handleSetToggleModal: HandleSetToggleModal
    }): {
        playlist: Playlist | undefined
        closeModal: () => void
        cssPreparer: string
        status: Status
    }
}


const useNowPlayingModal: Hook = ({toggleModal, handleSetToggleModal}) => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)
    const [playlist, setPlaylist] = useState<Playlist | undefined>()
    const {showModal,closeModal,cssPreparer,status} = useModal({initialStatus: toggleModal ? 'show' : 'hide'})
    const history = useHistory()
    const isMounted = useRef(true)

    useEffect(() => {
        return () => {isMounted.current = false}
    },[])

    useEffect(() => {
        if(status === 'show' && currentState.context && accessToken)
            fetchData()
        async function fetchData(){
                const id = currentState.context?.uri.split(':')[2] || ''
                if(currentState.context?.type === 'playlist'){
                    const playlist = await fetchPlaylist(accessToken, id)
                    if(playlist && isMounted.current)
                        setPlaylist(playlist)
                } 
            }
    },[status, currentState, accessToken])

    useEffect(() => {
        if(toggleModal === true && isMounted.current){
            showModal()
        }
    //eslint-disable-next-line
    },[toggleModal, currentState])

    useEffect(() => {
        if(status === 'hide' && isMounted.current){
            handleSetToggleModal(false)
        }
    //eslint-disable-next-line
    },[status])

    useEffect(() => {
        if(status === 'show'){
            history.push(history.location.pathname, {isNowPlayingModalActive: true})
        }
        window.addEventListener('popstate', closeModal, false)
    //eslint-disable-next-line
    },[status, history])

    return {playlist, closeModal, cssPreparer, status}
}

export default useNowPlayingModal