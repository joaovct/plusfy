import React from 'react';
import styled from 'styled-components';
import {PlayCircle as Play, PauseCircle as Pause, SkipBack as Prev, SkipForward as Next, Shuffle, Repeat} from 'react-feather'
import {IChildComponent as IcenterButtons} from './types'
import { colors, metrics } from '../../../../styles/style';
import useNowPlayingCenterButtons from '../../../../common/hooks/components/nowPlaying/useNowPlayingCenterButtons';

const CenterButtons: React.FC<IcenterButtons> = ({currentState}) => {
    const {toggleShufflePlayer, previousTrackPlayer, playPauseTrackPlayer, nextTrackPlayer, toggleRepeatPlayer} = useNowPlayingCenterButtons()

    return(
        <Center>
            <ShuffleButton
                onClick={toggleShufflePlayer}
                isAvailable={currentState.actions?.disallows?.toggling_shuffle === true ? false : true}
                isActive={currentState.shuffle_state || false}
            >
                <Shuffle/>
            </ShuffleButton>
            <ActionButton
                onClick={previousTrackPlayer}
                isAvailable={currentState.actions?.disallows?.skipping_prev === true ? false : true}
            >
                <Prev/>
            </ActionButton>
            <PlayPauseButton
                onClick={playPauseTrackPlayer}
                isPlaying={currentState.is_playing || false}
            >
                {currentState.is_playing ? <Pause/> : <Play/>}
            </PlayPauseButton>
            <ActionButton
                onClick={nextTrackPlayer}
                isAvailable={currentState.actions?.disallows?.skipping_next === true ? false : true}
            >
                <Next/>
            </ActionButton>
            <RepeatButton
                onClick={toggleRepeatPlayer}
                isAvailable={currentState.actions?.disallows?.toggling_repeat_track === true ? false : true}
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

    ${({isAvailable}) => {
        if(!isAvailable)
            return `opacity: var(--iconOpacity); pointer-events: none; user-select: none;`
        return ''
    }}
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