import React from 'react'
import { Button, colors, metrics, Title} from '../../../styles/style'
import ListPlaylists from '../listPlaylists/ListPlaylists'
import useAddToPlaylistLogic from '../../../common/hooks/components/addPlaylist/useAddToPlaylistLogic'
import Modal from '../modal/Modal'
import {X as Close} from 'react-feather'
import styled from 'styled-components'

const AddPlaylist = () => {
    const {show, cssPreparer, closeModal, playlists, addToPlaylist} = useAddToPlaylistLogic()

    return(
        <>
            {
                show === true ?
                <Modal cssModal={cssModal} cssPage={cssPreparer}>
                    <WrapperModalContent>
                        <Close onClick={closeModal}/>
                        <Title>Adicionar à playlist</Title>
                        <WrapperListPlaylists>
                            <ListPlaylists
                                playlists={playlists}
                                actionOnClick={(playlist) => addToPlaylist(playlist.id)}
                            />
                        </WrapperListPlaylists>
                    </WrapperModalContent>
                </Modal>
                : <></>
            }
        </>
    )
}

const cssModal = `
    min-height: inherit;
    max-height: inherit;
    min-width: inherit;
    max-width: 100vw;
    width: 100%;
    height: 100%;
    background: ${colors.backgroundTranslucent};
    border-radius: 0;
    overflow-y: auto;
`

const WrapperListPlaylists = styled.div`
    margin: ${metrics.spacing3} 0 0 0;
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