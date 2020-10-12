import React, { useCallback } from 'react';
import styled from 'styled-components';
import {PlayCircle as Play, PauseCircle as Pause, SkipBack as Prev, SkipForward as Next} from 'react-feather'
import {IchildComponent as IcenterButtons} from './types'
import { useSelector } from 'react-redux';
import { Istore } from '../../../store/types';
import { Itoken } from '../../../store/token/types';
import { nextPlayer, pausePlayer, playPlayer, previousPlayer } from '../../../api/webapi/player';
import { metrics } from '../../../styles/style';

const CenterButtons: React.FC<IcenterButtons> = ({currentState}) => {
    const {accessToken} = useSelector<Istore, Itoken>(store => store.token)

    const handlePrevTrackPlayer = useCallback(() => accessToken ? previousPlayer({accessToken}) : null
    ,[accessToken])

    const handlePlayPausePlayer = useCallback(() => {
        if(accessToken){
            if(currentState.is_playing)
                return pausePlayer({accessToken})
            return playPlayer({accessToken})
        }
    },[currentState, accessToken])

    const handleNextTrackPlayer = useCallback(() => accessToken ? nextPlayer({accessToken}) : null
    ,[accessToken])

    return(
        <WrapperButtons>
            <ActionButton onClick={handlePrevTrackPlayer} isAvailable={currentState.actions?.dissallows?.skipping_prev ? false : true}>
                <Prev/>
            </ActionButton>
            <PlayPauseButton onClick={handlePlayPausePlayer} isPlaying={currentState.is_playing || false}>
                {currentState.is_playing ? <Pause/> : <Play/>}
            </PlayPauseButton>
            <ActionButton onClick={handleNextTrackPlayer} isAvailable={currentState.actions?.dissallows?.skipping_next ? false : true}>
                <Next/>
            </ActionButton>
        </WrapperButtons>
    );
}

export default CenterButtons

const opacityDisabled = '.4'
const opacityNormal = '.7'
const opacityHover = '1'

interface IavailableAction{
    isAvailable: boolean
}

const ActionButton = styled.figure<IavailableAction>`
    svg{
        height: 20px;
        width: 20px;
        fill: #fff;
    }

    ${ ({isAvailable}) => !isAvailable
        ? `
            opacity: ${opacityDisabled};
            pointer-events: none;
            user-select: none;
        `
        : ``
    } }
`

const PlayPauseButton = styled.figure<{isPlaying: boolean}>`
    margin: 0 ${metrics.spacing4};

    svg{
        height: 40px;
        width: 40px;
        polygon{
            ${({isPlaying}) => !isPlaying ? 'fill: #fff' : ''};
        }
    }
`

const WrapperButtons = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    figure{

        svg{
            cursor: pointer;
            opacity: ${opacityNormal};
            transition: .25s;
        }

        &:hover{
            svg{
                opacity: ${opacityHover};
            }
        }
    }
`