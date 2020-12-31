import React from 'react'
import { Button, colors, metrics, Title, Text, Input, breakpoints } from '../../../styles/style'
import {StyledModal} from '../modal/Modal' 
import ListPlaylists from '../listPlaylists/ListPlaylists'
import useAddToPlaylistLogic from '../../../common/hooks/components/addPlaylist/useAddToPlaylistLogic'
import Modal from '../modal/Modal'
import {X as Close} from 'react-feather'
import styled from 'styled-components'

const AddPlaylist = () => {
    const {shouldShow, shouldShowCreatePlaylist, status, cssPreparer, closeModal, playlists, addToPlaylist, createPlaylist, showCreatePlaylist, inputRef} = useAddToPlaylistLogic()

    return(
        <StyledComponent background={status?.action === 'add-track' || (status?.action === 'create-playlist' && !status?.configs?.fullCloseCreatePlaylist)}>
            {
                shouldShow === true ?
                <Modal cssPage={cssPreparer}>
                    {
                        status?.action === 'add-track' || !status?.configs?.fullCloseCreatePlaylist ?
                        <ModalContent>
                            <Close onClick={closeModal}/>
                            <Button onClick={showCreatePlaylist}>Nova playlist</Button>
                            <Title>Adicionar à playlist</Title>
                            <WrapperListPlaylists>
                                <ListPlaylists
                                    playlists={playlists}
                                    actionOnClick={(playlist) => addToPlaylist(playlist.id)}
                                />
                            </WrapperListPlaylists>
                        </ModalContent>
                        : <></>
                    }
                    <ModalCreatePlaylist show={shouldShowCreatePlaylist} translucent={status?.configs?.fullCloseCreatePlaylist === true}>
                        <Title>Criar Playlist</Title>
                        <div>
                            <Text>Dê um nome a sua playlist</Text>
                            <Input ref={inputRef} type="text" placeholder="Nome maneiro..."/>
                            <span>
                                <button onClick={closeModal}>Cancelar</button>
                                <button onClick={createPlaylist}>Criar</button>
                            </span>
                        </div>
                    </ModalCreatePlaylist>
                </Modal>
                : <></>
            }
        </StyledComponent>
    )
}

const ModalContent = styled.div`
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
        background: ${colors.primary};
        padding-top: 12px;
        padding-bottom: 12px;
    }
`

const ModalCreatePlaylist = styled(ModalContent)<{show: boolean, translucent: boolean}>`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    padding: ${metrics.spacing4};
    background: ${({translucent}) => translucent ? colors.darkerBackgroundTranslucent : colors.darkerBackground};
    backdrop-filter: ${metrics.backdropBlurFilter};
    transition: .5s opacity;
    opacity: 0;
    pointer-events: none;
    user-select: none;

    div{
        margin: auto 0;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        width: 100%;

        ${Text}{
            width: 100%;
            text-align: center;

            @media(max-width: ${breakpoints.smp}){
                font-size: 16px;
            }
        }

        ${Input}{
            width: 100%;
            max-width: 600px;
            margin: ${metrics.spacing3} 0 0 0;
            padding-left: 16px;
            padding-right: 16px;
        }

        span{
            width: 100%;
            display: flex;
            justify-content: center;
            flex-flow: row nowrap;
            margin: ${metrics.spacing4} 0 0 0;

            button{
                font-size: 18px;
                letter-spacing: 1.2;
                font-weight: 500;
                text-transform: uppercase;
                text-align: center;
                color: ${colors.gray};
                cursor: pointer;
                margin: 0 20px;

                &:nth-child(2){
                    color: ${colors.primary};
                }

                @media(max-width: ${breakpoints.sml}){
                    font-size: 16px;
                }
                @media(max-width: ${breakpoints.smp}){
                    font-size: 14px;
                }
            }
        }
    }

    ${ ({show}) => 
    show ? `
        opacity: 1;
        pointer-events: all;
        user-select: text;
    ` : ''
    }
`

const WrapperListPlaylists = styled.div`
    margin: ${metrics.spacing3} 0 0 0;
`

const StyledComponent = styled.div<{background?: boolean}>`
    ${StyledModal}{
        min-height: inherit;
        max-height: inherit;
        min-width: inherit;
        max-width: 100vw;
        width: 100%;
        height: 100%;
        background: ${({background}) => background ? colors.darkerBackgroundTranslucent : 'rgba(0,0,0,0)'};
        border-radius: 0;
        overflow-y: auto;
    }
`

export default AddPlaylist