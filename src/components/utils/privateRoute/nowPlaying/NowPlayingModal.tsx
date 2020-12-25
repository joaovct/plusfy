import React, { useEffect } from 'react'
import useModal from '../../../../common/hooks/components/modal/useModal'
import { breakpoints, colors, metrics } from '../../../../styles/style'
import Modal from '../../../common/modal/Modal'
import { HandleSetToggleModal } from './types'
import styled, {css} from 'styled-components'
import { useSelector } from 'react-redux'
import { IStore } from '../../../../redux/store/types'
import { ICurrentState } from '../../../../redux/store/currentState/types'
import {ChevronDown as Close, MoreVertical, Heart, Shuffle, Repeat, SkipBack, SkipForward, Volume2} from 'react-feather'
import {PlayCircleFilledRounded as Play, PauseCircleFilledRounded as Pause, Devices} from '@material-ui/icons'

interface Props{
    toggleModal: boolean
    handleSetToggleModal: HandleSetToggleModal
}

const NowPlayingModal: React.FC<Props> = ({toggleModal, handleSetToggleModal}) => {
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState) 
    const {showModal,closeModal,cssPreparer,status} = useModal({initialStatus: toggleModal ? 'show' : 'hide'})

    useEffect(() => {
        if(toggleModal === true && window.innerWidth <= breakpoints.absoluteDimensions.tbp)
            showModal()
    //eslint-disable-next-line
    },[toggleModal])

    useEffect(() => {
        if(status === 'hide')
            handleSetToggleModal(false)
    //eslint-disable-next-line
    },[status])

    return(
        <>
            {
                status === 'show' ?
                <Modal cssPage={cssPreparer} cssModal={cssModal}>
                    <HeaderModal>
                        <Close onClick={closeModal}/>
                        <strong>mpb <span role="img" aria-label="icon">🎸</span></strong>
                        <MoreVertical/>
                    </HeaderModal>
                    <AlbumPhoto>
                        <figure>
                            <img src="https://i.scdn.co/image/ab67616d0000b2736ea95d31b289864b0cc890b4" alt="Album"/>
                        </figure>
                    </AlbumPhoto>
                    <footer>
                        <TrackInfo>
                            <span>
                                <strong>Pontos de Exclamação</strong>
                                <small>Jovem Dionisio</small>
                            </span>
                            <Heart/>
                        </TrackInfo>
                        <Controls>
                            <Button>
                                <Shuffle/>
                            </Button>
                            <MainControls>
                                <Button>
                                    <SkipBack/>
                                </Button> 
                                <Button>
                                    {
                                        currentState.is_playing ? <Pause/> : <Play/>
                                    }
                                </Button>
                                <Button>
                                    <SkipForward/>
                                </Button> 
                            </MainControls>
                            <Button>
                                <Repeat/>
                            </Button>
                        </Controls>
                        <Controls>
                            <Button>
                                <Devices/>
                            </Button>
                            <Button>
                                <Volume2/>
                            </Button>
                        </Controls>
                    </footer>
                </Modal>
                : <></>
            }
        </>
    )
}

const Button = styled.figure`
    svg{
        cursor: pointer;
        height: 20px;
        width: 20px;
    }
`

const MainControls = styled.div`
    flex: 1 1 auto;
    padding: 0 20px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    ${Button}{
        &:not(:nth-child(2)) svg{
            height: 24px;
            width: 24px;
            fill: #fff;
        }
        &:nth-child(2) svg{
            height: 60px;
            width: 60px;
            margin: 0 30px;
        }
    }
`

const Controls = styled.div`
    margin: 20px 0 0 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const TrackInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    span{
        display: flex;
        flex-flow: column nowrap;

        strong{
            font-weight: 600;
            font-size: 18px;
            line-height: 1.2;
        }

        small{
            margin: 2.5px 0 0 0;
            font-weight: 400;
            font-size: 14px;
            line-height: 1.2;
            color: ${colors.gray};
        }
    }

    svg{
        height: 20px;
        width: 20px;
        cursor: pointer;
    }
`

const AlbumPhoto = styled.div`
    flex: 1 1 auto;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;

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
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 auto 0;

    svg{
        height: 25px;
        width: 25px;
        cursor: pointer;

        &:first-child{
            height: 35px;
            width: 35px;
        }
    }

    strong{
        font-size: 18px;
        font-weight: 500;
    }
`

const cssModal = css`
    min-height: inherit;
    min-width: inherit;
    max-height: 100%;
    max-width: inherit;
    height: 100%;
    width: 100%;
    background: ${colors.darkerBackground};
    /* background: ${colors.darkerBackgroundTranslucent}; */
    /* backdrop-filter: ${metrics.backdropBlurFilter}; */
    border-radius: 0px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
    padding: 40px 20px 20px 20px;
`

export default NowPlayingModal