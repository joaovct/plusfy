import React from 'react'
import styled from 'styled-components'
import { Dropdown as dropdown, metrics, InputRange, colors } from '../../../../styles/style'
import { useSelector } from 'react-redux'
import { IStore } from '../../../../redux/store/types'
import { ICurrentState } from '../../../../redux/store/currentState/types'
import useNowPlayingRightButtons from '../../../../common/hooks/components/nowPlaying/useNowPlayingRightButtons'


const RightButtons = () => {
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)
    const {volume, setVolume, toggleDropdownVolume, setToggleDropdownVolume, volumeRef, getVolumeIcon} = useNowPlayingRightButtons()

    return(
        <Right>
            <WrapperDropdown>
                <button onClick={() => setToggleDropdownVolume(old => !old)}>
                    {getVolumeIcon()}
                </button>
                <Dropdown show={toggleDropdownVolume} ref={volumeRef}>
                    <li>
                        <SpanVolumeControl>
                            <InputRange
                                value={volume}
                                onChange={e => {console.log(e.target.value); setVolume(+e.target.value)}}
                                type="range"
                                min="0" max="100"
                                disabled={Object.keys(currentState).length ? false : true}
                            />
                            <RangeBar volume={volume}/>
                        </SpanVolumeControl>
                    </li>
                </Dropdown>
            </WrapperDropdown>
        </Right>
    )
}

export default RightButtons

const RangeBar = styled.div<{volume: number}>`
    height: ${({volume}) => `calc( var(--heightInput) * ${volume / 100} + var(--additionThumbSize))`};
    max-height: var(--heightInput);
    width: var(--widthInput);
    position: absolute;
    bottom: calc(var(--spacingHeight) / 2);
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto; 
    border-radius: ${metrics.borderRadius};
    background: ${colors.gray};
    transition: .25s background;

    &:before{
        content: '';
        display: block;
        height: var(--heightInput);
        width: var(--widthInput);
        background: ${colors.darkerGray};
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto; 
        border-radius: ${metrics.borderRadius};
        z-index: -1;
    }
`

const SpanVolumeControl = styled.span`
    display: inline-block;
    --widthInput: 15px;
    --heightInput: 130px;
    --spacingWidth: 30px;
    --spacingHeight: 30px;
    --additionThumbSize: 5px;
    --sizeThumb: calc( var(--widthInput) + var(--additionThumbSize) );
    height: calc( var(--heightInput) + var(--spacingHeight));
    width: calc( var(--widthInput) + var(--spacingWidth));
    position: relative;

    ${InputRange}{
        height: var(--widthInput);
        width: var(--heightInput);
        margin: calc( var(--heightInput) / 3 ) 0 0 0;
        --translateY: calc( var(--heightInput) / -2 + var(--widthInput) / 2 + var(--spacingWidth) / 2);
        --translateX: calc(var(--spacingHeight) / -2 + var(--additionThumbSize) / -2);
        transform: rotate(-90deg) translateY(var(--translateY)) translateX(var(--translateX));
        /* appearance: vertical-mode; */
        position: relative;
        z-index: 2;

        &::-webkit-slider-thumb{
            appearance: none;
            height: var(--sizeThumb);
            width: var(--sizeThumb);
            margin-top: calc( var(--additionThumbSize) / -2 );
            border-radius: 100%;
            background: #fff;
        }

        &::-webkit-slider-runnable-track{
            width: 100%;
            height: 100%;
            cursor: pointer;
            background: transparent;
            border-radius: ${metrics.borderRadius};
            transition: .25s background;
        }

        &::-ms-track{
            width: 100%;
            cursor: pointer;
            background: transparent;
            border-color: transparent;
            color: transparent;
        }

        &:focus{
            outline: 0;
        }

        &:not(:disabled):hover{
            & + ${RangeBar}{
                background: ${colors.primary};
            }
        }
    }
`

const Dropdown = styled(dropdown)`
    top: inherit;
    left: inherit;
    right: inherit;
    bottom: calc(100% + ${metrics.spacing2});
    min-width: inherit;
    overflow: hidden;

    ${SpanVolumeControl}{
        padding-left: 0;
        padding-right: 0;
    }
`

const WrapperDropdown = styled.div`
    height: 100%;
    overflow: visible;
    position: relative;
    padding: var(--innerPadding);
    padding-left: ${metrics.spacing3};
    padding-right: ${metrics.spacing3};
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;

    svg{
        height: 22.5px;
        width: 22.5px;
        cursor: pointer;
        opacity: var(--iconOpacity);
        transition: opacity var(--iconOpacityTransition);
        
        &:hover{
            opacity: var(--iconOpacityActivate);
        }
    }
`

const Right = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    overflow: visible;
    padding: var(--innerPadding);
    padding-top: 0;
    padding-bottom: 0;
`