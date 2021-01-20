import React from 'react'
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

    const redirectToPlaylist = () => {
        if(playlist){
            history.push(`/playlist/${playlist.id}`)
            closeModal()
        }
    }

    return(
        <>
            {
                status === 'show' ?
                <Modal cssPage={cssPreparer} cssModal={cssModal}>
                    <HeaderModal>
                        <Close onClick={closeModal}/>
                        <button onClick={redirectToPlaylist}>
                            <span>
                                <strong>{playlist?.name || ''}</strong>
                            </span>
                        </button>
                        {
                            currentState.item ?
                                <NowPlayingModalHeaderOptions track={currentState.item}/>
                            : <></>
                        }
                    </HeaderModal>
                    <AlbumPhoto>
                        <figure>
                            <img src={formatTrackPhoto(currentState.item)} alt="Album"/>
                        </figure>
                    </AlbumPhoto>
                    <footer>
                        {
                            currentState.item ? 
                            <TrackInfo isTrackSaved={isTrackSaved}>
                                <article>
                                    <span>
                                        <strong>{currentState.item.name}</strong>
                                    </span>
                                    <span>
                                        <small>{formatArtistName(currentState.item)}</small>
                                    </span>
                                </article>
                                <button onClick={handleLike}>
                                    <Heart/>
                                </button>
                            </TrackInfo> : <></>
                        }
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
            height: 70px;
            width: 70px;
            margin: 0 20px;
        }
        
        @media(max-width: ${breakpoints.sml}){
            &:nth-child(2) svg{
                margin: 0 15px;
            }
        }

        @media(max-width: 340px){
            &:not(:nth-child(2)) svg{
                height: 30px;
                width: 30px;
            }
            &:nth-child(2) svg{
                height: 65px;
                width: 65px;
            }
        }

        @media(max-width: ${breakpoints.smp}){
            &:not(:nth-child(2)) svg{
                height: 25px;
                width: 25px;
            }
            &:nth-child(2) svg{
                height: 60px;
                width: 60px;
            }
        }

        @media(max-width: 280px){
            &:not(:nth-child(2)) svg{
                height: 20px;
                width: 20px;
            }
            &:nth-child(2) svg{
                height: 55px;
                width: 55px;
            }
        }
    }

    @media(max-width: ${breakpoints.smp}){
        padding: 0 10px;
    }
`

const TrackInfo = styled.div<{isTrackSaved: boolean}>`
    flex: 1 1 auto;
    max-width: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;

    svg{
        height: 20px;
        width: 20px;
        cursor: pointer;
        transition: var(--iconOpacityTransition);

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

const AlbumPhoto = styled.div`
    flex: 1 1 auto;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;

    @media(max-width: ${breakpoints.smp}){
        padding: 30px 0;
    }

    figure{
        width: 100%;
        position: relative;
        max-width: 50vh;

        &:after{
            content: "";
            display: block;
            padding-bottom: 100%;
        }

        img{
            height: 100%;
            width: 100%;
            object-fit: cover;
            position: absolute;
            border-radius: ${metrics.borderRadius};
            box-shadow: ${metrics.boxShadow};
        }
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
    }

    span{
        strong{
            text-align: center;
            font-size: 16px;
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

const cssModal = css`
    min-height: inherit;
    min-width: inherit;
    max-height: 100%;
    max-width: inherit;
    height: 100%;
    width: 100%;
    background: ${colors.darkerBackgroundTranslucent};
    backdrop-filter: ${metrics.backdropBlurFilter};
    border-radius: 0px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
    --topSpacingModal: 40px;
    --sideSpacingModal: 40px;
    --bottomSpacingModal: 20px;
    --spacingModal: var(--topSpacingModal) var(--sideSpacingModal) var(--bottomSpacingModal) var(--sideSpacingModal);
    padding: var(--spacingModal);
    ${cssVariables}
    z-index: var(--zIndexNowPlayingModal);

    @media(max-width: ${breakpoints.smp}){
        --sideSpacingModal: 25px;
    }
`

export default NowPlayingModal