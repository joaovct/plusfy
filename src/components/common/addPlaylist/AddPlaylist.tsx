import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { addItemsToPlaylist, fetchUserPlaylists, Status as RequestStatus } from '../../../common/api/webapi/playlists'
import { Playlist } from '../../../common/api/webapi/types'
import { IToken } from '../../../redux/store/token/types'
import { IStore } from '../../../redux/store/types'
import { Button, colors, metrics, ListPlaylistsItemStyled as PlaylistItem, ListPlaylistsStyled as Playlists, Title} from '../../../styles/style'
import Modal from '../modal/Modal'
import emptyPlaylistPhoto from '../../../assets/empty-playlist-photo.svg'
import {X as Close} from 'react-feather'
import useModal from '../../../common/hooks/components/modal/useModal'
import useAlert from '../../../common/hooks/components/alert/useAlert'
import { AddToPlaylistContext } from '../../../common/providers/AddToPlaylistProvider'

const AddPlaylist = () => {
    const {executeCallback, status} = useContext(AddToPlaylistContext)
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const createAlert = useAlert()
    const [requestStatus, setRequestStatus] = useState<RequestStatus | ''>('')
    const [playlists, setPlaylists] = useState<Playlist[]>([])
    const [itemsAdded, setItemsAdded] = useState<boolean | null>(null)
    const {state: modalState, CSSpreparer, showModal, closeModal} = useModal()

    useEffect(() => {
        if(status && status.state === 'adding'){
            const fetchData = async () => {
                const response = await fetchUserPlaylists(accessToken)
                setRequestStatus(response.status)
                setPlaylists(response.items)
            }
            fetchData()
            showModal()
        }
    //eslint-disable-next-line
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

    const handleAddPlaylist = useCallback(async (playlistId: string) => {
        if(status){
            const res = await addItemsToPlaylist(accessToken, {playlistId, uris: status.uris})
            setItemsAdded(res?.snapshot_id ? true : false)
        }
    },[status, accessToken])

    return <>{
    status?.state === 'adding' && requestStatus === 'success' && modalState === 'show' ?
    <Modal styleModal={modalCSS} styleModalPage={CSSpreparer} content={
        <WrapperModalContent>
            <Close onClick={closeModal}/>
            <Title>Adicionar à playlist</Title>
            {/* <Button>Nova playlist</Button> */}
            <Playlists>
                {
                    playlists.map((playlist) => (
                        <PlaylistItem key={`${playlist.id}-AddPlaylist`}>
                            <button onClick={() => handleAddPlaylist(playlist.id)}>
                                <figure>
                                    <img src={playlist.images.length ? playlist.images[0].url : emptyPlaylistPhoto} alt={playlist.name}/>
                                </figure>
                            </button>
                            <span>{playlist.name}</span>
                        </PlaylistItem>
                    ))
                }
            </Playlists>
        </WrapperModalContent>
    }/>
    : <></>
    }</>
}

const modalCSS = `
    min-height: inherit;
    max-height: inherit;
    min-width: inherit;
    max-width: inherit;
    width: 100%;
    height: 100%;
    background: ${colors.backgroundTranslucent};
    border-radius: 0;
    overflow-y: auto;
`

const WrapperModalContent = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    & > svg{
        height: 65px;
        width: 65px;
        margin: 0 auto;
        cursor: pointer;
    }

    ${Title},
    ${Button}{
        text-align: center;
        margin: ${metrics.spacing4} 0 0 0;
    }

    ${Button}{
        min-width: inherit;
        padding: 16px 32px;
    }

`

export default AddPlaylist