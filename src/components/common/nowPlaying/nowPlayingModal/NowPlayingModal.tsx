import React, { useCallback, useEffect, useRef, useState } from 'react'
import { colors, metrics, breakpoints } from '../../../../styles/style'
import Modal from '../../modal/Modal'
import { HandleSetToggleModal } from '../types'
import styled, {css} from 'styled-components'
import { useSelector } from 'react-redux'
import { IStore } from '../../../../redux/store/types'
import { ICurrentState } from '../../../../redux/store/currentState/types'
import { Heart, Shuffle, Repeat, SkipBack, SkipForward} from 'react-feather'
import {PlayCircleFilledRounded as Play, PauseCircleFilledRounded as Pause} from '@material-ui/icons'
import { formatArtistName, formatTrackPhoto } from '../../../../common/helpers/helperPlaylistTable'
import ModalAdditionalButtons from './ModalAdditionalButtons'
import NowPlayingModalHeaderOptions from './NowPlayingModalHeaderOptions'
import useNowPlayingLike from '../../../../common/hooks/components/nowPlaying/useNowPlayingLike'
import {ChevronDown as Close} from 'react-feather'
import useNowPlayingModal from '../../../../common/hooks/components/nowPlaying/useNowPlayingModal'
import useNowPlayingMainButtons from '../../../../common/hooks/components/nowPlaying/useNowPlayingMainButtons'
import { Controls, Button } from './style'
import { cssVariables } from '../style'
import { useHistory } from 'react-router-dom'

interface Props{
    toggleModal: boolean
    handleSetToggleModal: HandleSetToggleModal
}

const NowPlayingModal: React.FC<Props> = ({toggleModal, handleSetToggleModal}) => {
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)
    const {clickShuffle, clickPrevious, clickPlayPause, clickNext, clickRepeat} = useNowPlayingMainButtons()
    const {playlist, closeModal, cssPreparer, status} = useNowPlayingModal({toggleModal, handleSetToggleModal})
    const {isTrackSaved, handleLike} = useNowPlayingLike()
    const history = useHistory()
    const [albumPhotoNode, setAlbumPhotoNode] = useState<HTMLDivElement | null>(null)
    const [sizePhoto, setSizePhoto] = useState(0)
    const mounted = useRef(true)

    useEffect(() => () => {
        mounted.current = false
    },[])

    const redirectToPlaylist = () => {
        if(playlist){
            history.push(`/playlist/${playlist.id}`)
            closeModal()
        }
    }

    function calculateSize(clientWidth: number, clientHeight: number){
        if(clientWidth && clientHeight){
            const remainingHeight = clientHeight - verticalSpacingPhoto * 2
            const remainingWidth = clientWidth
            return remainingWidth > remainingHeight ? remainingHeight : remainingWidth
        }
        return 0
    }

    const measuredRef = useCallback((node: HTMLDivElement | null) => {
        if(node){
            setAlbumPhotoNode(node)
            setSizePhoto(calculateSize(node.clientWidth, node.clientHeight))
        }
    },[])

    useEffect(() => {
        if(albumPhotoNode){
            window.addEventListener('resize', () => {
                setSizePhoto(calculateSize(albumPhotoNode.clientWidth, albumPhotoNode.clientHeight))
            })
        }
    },[albumPhotoNode])

    return(
        <>
            {
                status === 'show' ?
                <Modal cssPage={cssPreparer+cssModalPage} cssModal={cssModal}>
                    <HeaderModal>
                        <Close onClick={closeModal}/>
                        <button onClick={redirectToPlaylist}>
                            <span>
                                {
                                    playlist?.name ? 
                                    <>
                                        <small>
                                            Tocando da playlist
                                        </small>
                                        <strong>{playlist.name}</strong>
                                    </>
                                    :
                                    <>
                                        <small>Tocando da fila</small>
                                    </>
                                }
                            </span>
                        </button>
                        {
                            currentState.item ?
                                <NowPlayingModalHeaderOptions track={currentState.item}/>
                            : <></>
                        }
                    </HeaderModal>
                    <AlbumPhoto ref={measuredRef} sizePhoto={sizePhoto}>
                        <img src={formatTrackPhoto(currentState.item)} alt="Album"/>
                    </AlbumPhoto>
                    <footer> 
                        <TrackInfo isTrackSaved={isTrackSaved}>
                            <article>
                                <span>
                                    <strong>{currentState.item?.name || ''}</strong>
                                </span>
                                <span>
                                    <small>{currentState.item ? formatArtistName(currentState.item) : ''}</small>
                                </span>
                            </article>
                            <button onClick={handleLike}>
                                <Heart/>
                            </button>
                        </TrackInfo>
                        <Controls>
                            <Button
                                onClick={clickShuffle}
                                isAvailable={currentState.actions?.disallows?.toggling_shuffle === true ? false : true}
                                isActive={currentState.shuffle_state === true ? true : false}
                            >
                                <Shuffle/>
                            </Button>
                            <MainControls>
                                <Button
                                    onClick={clickPrevious}
                                    isAvailable={currentState.actions?.disallows?.skipping_prev === true ? false : true}
                                >
                                    <SkipBack/>
                                </Button> 
                                <Button
                                    onClick={clickPlayPause}
                                    isAvailable={true}
                                >
                                    {
                                        currentState.is_playing ? <Pause/> : <Play/>
                                    }
                                </Button>
                                <Button
                                    onClick={clickNext}
                                    isAvailable={currentState.actions?.disallows?.skipping_next === true ? false : true}
                                >
                                    <SkipForward/>
                                </Button> 
                            </MainControls>
                            <Button
                                onClick={clickRepeat}
                                isAvailable={currentState.actions?.disallows?.toggling_repeat_track === true ? false : true}
                                repeatState={currentState.repeat_state || 'off'}
                            >
                                <Repeat/>
                            </Button>
                        </Controls>
                        <ModalAdditionalButtons/>
                    </footer>
                </Modal>
                : <></>
            }
        </>
    )
}

const MainControls = styled.div`
    flex: 1 1 auto;
    padding: 0 20px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    ${Button}{
        &:not(:nth-child(2)) svg{
            height: 35px;
            width: 35px;
            fill: #fff;
        }
        &:nth-child(2) svg{
            height: 75px;
            width: 75px;
            margin: 0 32px;
        }
        
        @media(max-width: 400px){
            &:nth-child(2) svg{
                height: 70px;
                width: 70px;
            }
        }

        @media(max-width: 360px){
            &:nth-child(2) svg{
                height: 65px;
                width: 65px;
                margin: 0 24px;
            }
        }

        @media(max-width: 340px){
            &:not(:nth-child(2)) svg{
                height: 30px;
                width: 30px;
                fill: #fff;
            }
        }

        @media(max-width: ${breakpoints.smp}){
            &:nth-child(2) svg{
                height: 62.5px;
                width: 62.5px;
                margin: 0 16px;
            }
        }
    }

    @media(max-width: ${breakpoints.smp}){
        padding: 0 10px;
    }
`

const TrackInfo = styled.div<{isTrackSaved: boolean}>`
    flex: 1;
    max-width: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;

    svg{
        height: 20px;
        width: 20px;
        cursor: pointer;
        transition: var(--iconOpacityTransition);
        stroke-width: 1.5px;

        ${({isTrackSaved}) => {
            if(isTrackSaved)
                return `
                    stroke: ${colors.primary};
                    color: ${colors.primary};
                    fill: ${colors.primary};
                `
        }}
    }

    article{
        flex: 1 1 auto;
        width: 100%;
        max-width: 100%;
        display: flex;
        flex-flow: column nowrap;
        padding: 0 5px 0 0;

        span{
            max-width: 100%;
            width: 100%;
            display: table;
            table-layout: fixed;

            strong, small{
                text-align: left;
                display: table-cell;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            strong{
                font-weight: 600;
                font-size: 20px;
                line-height: 1.2;
            }

            small{
                margin: 2.5px 0 0 0;
                font-weight: 400;
                font-size: 16px;
                line-height: 1.2;
                color: ${colors.gray};
            }

            @media(max-width: 400px){
                strong{
                    font-size: 18px;
                }
                small{
                    font-size: 14px;
                }
            }
        }
    }
`

const verticalSpacingPhoto = 32

const AlbumPhoto = styled.div<{sizePhoto: number}>`
    --size: ${({sizePhoto}) => sizePhoto + 'px'};
    height: var(--size);
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    --padding: ${verticalSpacingPhoto}px;
    padding: var(--padding) 0;
    
    img{
        height: var(--size);
        width: var(--size);
        object-fit: cover;
        border-radius: ${metrics.borderRadius};
        box-shadow: ${metrics.boxShadow};
    }
`

const HeaderModal = styled.div`
    --sizeCloseButton: 35px;
    --sizeOptionsButton: 25px;
    width: 100%;
    display: grid;
    grid-template-columns: var(--sizeCloseButton) 1fr var(--sizeOptionsButton); 
    column-gap: ${metrics.spacing1};
    align-items: center;
    margin: 0 0 auto 0;

    & > svg{
        height: var(--sizeCloseButton);
        width: var(--sizeCloseButton);
        cursor: pointer;
        stroke-width: 1.5px;
    }

    span{
        &, *{
            font-style: normal;
            text-align: center;
        }
        small{
            font-size: 10px;
            font-weight: 300;
            color: ${colors.gray};
            text-transform: uppercase;
            letter-spacing: 1.4px;
        }

        strong{
            margin: 4px 0 0 0;
            font-size: 14px;
            font-weight: 500;
            --lineHeight: 1.2em;
            --numberLines: 2;
            line-height: var(--lineHeight);
            max-height: calc(var(--lineHeight) * var(--numberLines));
            display: -webkit-box;
            -webkit-line-clamp: var(--numberLines);
            -webkit-box-orient: vertical;  
            overflow: hidden;
            color: #fff;
        }
    }
`

const cssModalPage = css`
    backdrop-filter: blur(8px);
`

const verticalSpacingModal = 20
const horizontalSpacingModal = 20

const cssModal = css`
    min-height: inherit;
    min-width: inherit;
    max-height: inherit;
    max-width: inherit;
    height: ${() => window.innerHeight+"px" || "100%"};
    width: 100%;
    background: ${colors.darkerBackgroundTranslucent};
    border-radius: 0px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
    --verticalSpacingModal: ${verticalSpacingModal}px;
    --horizontalSpacingModal: ${horizontalSpacingModal}px;
    --spacingModal: var(--verticalSpacingModal) var(--horizontalSpacingModal);
    padding: var(--spacingModal);
    ${cssVariables}
    z-index: var(--zIndexNowPlayingModal);

    @media(max-width: ${breakpoints.smp}){
        --sideSpacingModal: 25px;
    }
`

export default NowPlayingModal