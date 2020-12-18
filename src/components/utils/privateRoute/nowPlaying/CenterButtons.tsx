import React, { useCallback } from 'react';
import styled from 'styled-components';
import {PlayCircle as Play, PauseCircle as Pause, SkipBack as Prev, SkipForward as Next, Shuffle, Repeat} from 'react-feather'
import {IChildComponent as IcenterButtons} from './types'
import { useSelector } from 'react-redux';
import { IStore } from '../../../../redux/store/types';
import { IToken } from '../../../../redux/store/token/types';
import { nextPlayer, pausePlayer, resumePlayer, previousPlayer, shufflePlayer, repeatPlayer } from '../../../../common/api/webapi/player';
import { colors, metrics } from '../../../../styles/style';

const CenterButtons: React.FC<IcenterButtons> = ({currentState}) => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)

    const handleToggleShufflePlayer = useCallback(() => 
        accessToken ? shufflePlayer({accessToken, shuffle: !currentState.shuffle_state}) : null
    ,[accessToken, currentState])

    const handlePrevTrackPlayer = useCallback(() => 
        accessToken ? previousPlayer({accessToken}) : null
    ,[accessToken])

    const handlePlayPausePlayer = useCallback(() => {
        if(accessToken){
            if(currentState.is_playing)
                return pausePlayer({accessToken})
            return resumePlayer({accessToken})
        }
    },[currentState, accessToken])

    const handleNextTrackPlayer = useCallback(() => 
        accessToken ? nextPlayer({accessToken}) : null
    ,[accessToken])

    const handleRepeatPlayer = useCallback(() => {
        if(accessToken){
            const states = ['off', 'context', 'track']
            for(let i = 0; i < states.length; i++){
                if(states[i] === currentState.repeat_state){
                    const state = states[i+1] || states[0]
                    repeatPlayer({accessToken, state})
                    break
                }
            }
        }
    },[accessToken, currentState])

    return(
        <Center>
            <ShuffleButton
                onClick={handleToggleShufflePlayer}
                isAvailable={currentState.actions?.dissallows?.toggling_shuffle ? false : true}
                isActive={currentState.shuffle_state || false}
            >
                <Shuffle/>
            </ShuffleButton>
            <ActionButton onClick={handlePrevTrackPlayer} isAvailable={currentState.actions?.dissallows?.skipping_prev ? false : true}>
                <Prev/>
            </ActionButton>
            <PlayPauseButton onClick={handlePlayPausePlayer} isPlaying={currentState.is_playing || false}>
                {currentState.is_playing ? <Pause/> : <Play/>}
            </PlayPauseButton>
            <ActionButton onClick={handleNextTrackPlayer} isAvailable={currentState.actions?.dissallows?.skipping_next ? false : true}>
                <Next/>
            </ActionButton>
            <RepeatButton
                onClick={handleRepeatPlayer}
                isAvailable={currentState.actions?.dissallows?.toggling_repeat_track ? false : true}
                repeatState={currentState.repeat_state || ''}
            >
                <Repeat/>
            </RepeatButton>
        </Center>
    );
}

export default CenterButtons

interface IavailableAction{
    isAvailable: boolean
}

const ActionButton = styled.figure<IavailableAction>`
    margin: 0 ${metrics.spacing4};

    svg{
        height: 20px;
        width: 20px;
        fill: #fff;
        opacity: var(--iconOpacity);
    }

    ${ ({isAvailable}) => !isAvailable? `opacity: var(--iconOpacity); pointer-events: none; user-select: none;` : ''} }
`

interface IshuffleButton extends IavailableAction{
    isActive: boolean
} 

const ShuffleButton = styled(ActionButton)<IshuffleButton>`
    svg{
        fill: none;
        ${({isActive}) => isActive ? `stroke: ${colors.primary}; opacity: 1;` : ''}
    }
`

interface IrepeatButton extends IavailableAction{
    repeatState: string
}

const RepeatButton = styled(ActionButton)<IrepeatButton>`
    position: relative;

    &:before{
        font-size: 6px;
        line-height: 11px;
        height: 11px;
        width: 11px;
        padding-left: 1px;
        padding-top: 3px;
        box-sizing: border-box;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: -1px;
        right: -2px;
        z-index: 2;
        background: ${colors.primary};
    }

    svg{
        fill: none;
    }

    ${({repeatState}) => repeatState === 'context'
        ? `svg{stroke: ${colors.primary}; opacity: var(--iconOpacityActivate);}`
        : repeatState === 'track' ? `&:before{content: '1';} svg{stroke: ${colors.primary}; opacity: var(--iconOpacityActivate)}`: ''
    }
`

const PlayPauseButton = styled.figure<{isPlaying: boolean}>`
    svg{
        height: 40px;
        width: 40px;
        opacity: var(--iconOpacity);

        polygon{
            ${({isPlaying}) => !isPlaying ? 'fill: #fff' : ''};
        }
    }
`

const Center = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--innerPadding);

    figure{

        svg{
            cursor: pointer;
            transition: opacity var(--iconOpacityTransition);
        }

        &:hover{
            svg{
                opacity: var(--iconOpacityActivate);
            }
        }
    }
`