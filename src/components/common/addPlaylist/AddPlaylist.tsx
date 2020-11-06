import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { addItemsToPlaylist, fetchUserPlaylists, Status as RequestStatus } from '../../../common/api/webapi/playlists'
import { IPlaylist } from '../../../common/api/webapi/types'
import useAddPlaylist from '../../../common/hooks/useAddPlaylist'
import { IToken } from '../../../redux/store/token/types'
import { IStore } from '../../../redux/store/types'
import { Button, colors, metrics, PlaylistItem, Playlists, Title} from '../../../styles/style'
import Modal from '../modal/Modal'
import emptyPlaylistPhoto from '../../../assets/empty-playlist-photo.svg'
import {X as Close} from 'react-feather'
import useModal from '../../../common/hooks/useModal'
import useAlert from '../../../common/hooks/useAlert'

const AddPlaylist = () => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const {status, updateStatus} = useAddPlaylist()
    const {createAlert} = useAlert()
    const [requestStatus, setRequestStatus] = useState<RequestStatus | ''>('')
    const [playlists, setPlaylists] = useState<IPlaylist[]>([])
    const [itemsAdded, setItemsAdded] = useState<boolean | null>(null)
    const {state: modalState, CSSpreparer, showModal, closeModal} = useModal()

    useEffect(() => {
        if(status?.state === 'adding'){
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

    const handleAddPlaylist = useCallback(async (playlistId: string) => {
        if(status){
            const res = await addItemsToPlaylist(accessToken, {playlistId, uris: status.uris})
            setItemsAdded(res?.snapshot_id ? true : false)
        }
    },[status, accessToken])

    useEffect(() => {
        if(itemsAdded === true)
            updateStatus('added')
        else if(itemsAdded === false)
            updateStatus('error')
        if(itemsAdded !== null)
            closeModal()
    //eslint-disable-next-line
    },[itemsAdded])

    useEffect(() => {
        if(status && status.state === 'added')
            createAlert('success','Música adicionada à playlist 🎉')
        else if(status && status.state === 'error')
            createAlert('error','Ocorreu um erro ao adicionar a música à playlist.')
    //eslint-disable-next-line
    },[status])

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