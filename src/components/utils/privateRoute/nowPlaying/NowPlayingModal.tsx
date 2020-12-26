import React, { useEffect, useState } from 'react'
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
import { fetchPlaylist } from '../../../../common/api/webapi/playlists'
import { IPlayer, Playlist } from '../../../../common/api/webapi/types'
import { IToken } from '../../../../redux/store/token/types'
import { formatArtistName, formatTrackPhoto } from '../../../../common/helpers/helperPlaylistTable'
import useNowPlayingMainButtons from '../../../../common/hooks/components/nowPlaying/useNowPlayingMainButtons'
import { handleRepeatState } from '../../../../common/helpers/helperNowPlaying'
import { cssVariables } from './style'

interface Props{
    toggleModal: boolean
    handleSetToggleModal: HandleSetToggleModal
}

const NowPlayingModal: React.FC<Props> = ({toggleModal, handleSetToggleModal}) => {
    const {clickShuffle, clickPrevious, clickPlayPause, clickNext, clickRepeat} = useNowPlayingMainButtons()
    const [playlist, setPlaylist] = useState<Playlist | undefined>()
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState) 
    const {showModal,closeModal,cssPreparer,status} = useModal({initialStatus: toggleModal ? 'show' : 'hide'})

    useEffect(() => {
        fetchData()
        async function fetchData(){
            if(currentState.context && accessToken){
                const id = currentState.context.uri.split(':')[2]
                if(currentState.context.type === 'playlist'){
                    const playlist = await fetchPlaylist(accessToken, id)
                    if(playlist)
                        setPlaylist(playlist)
                } 
            }
        }
    },[currentState.context, accessToken])

    useEffect(() => {
        if(toggleModal === true && currentState.item?.uri && window.innerWidth <= breakpoints.absoluteDimensions.tbp)
            showModal()
    //eslint-disable-next-line
    },[toggleModal, currentState])

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
                        <strong>{playlist?.name}</strong>
                        <MoreVertical/>
                    </HeaderModal>
                    <AlbumPhoto>
                        <figure>
                            <img src={formatTrackPhoto(currentState.item)} alt="Album"/>
                        </figure>
                    </AlbumPhoto>
                    <footer>
                        {
                            currentState.item ? 
                            <TrackInfo>
                                <article>
                                    <span>
                                        <strong>{currentState.item.name}</strong>
                                    </span>
                                    <span>
                                        <small>{formatArtistName(currentState.item)}</small>
                                    </span>
                                </article>
                                <Heart/>
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

interface ButtonProps{
    isAvailable?: boolean
    isActive?: boolean
    repeatState?: IPlayer['repeat_state']
}

const Button = styled.button<ButtonProps>`
    svg{
        cursor: pointer;
        height: 20px;
        width: 20px;
        transition: var(--iconOpacityTransition);
    }

    ${({isAvailable, isActive, repeatState}) => {
        let css = ''

        if(isAvailable === false)
            css += `
                svg{
                    opacity: var(--iconOpacityDisabled);
                }
                pointer-events: none;
                user-select: none;
            `
        if(isActive === true)
            css += `
                svg{
                    stroke: ${colors.primary};
                    color: ${colors.primary};
                    opacity: var(--iconOpacityActivate);
                }
            `
        if(repeatState){
            css += handleRepeatState(repeatState)
        }

        return css
    }}
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
    max-width: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;

    svg{
        height: 20px;
        width: 20px;
        cursor: pointer;
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
    border-radius: 0px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
    padding: 40px 20px 20px 20px;
    ${cssVariables}
`

export default NowPlayingModal