import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {Volume, Volume1, Volume2, VolumeX} from 'react-feather'
import { Dropdown as dropdown, metrics, InputRange, colors } from '../../../../styles/style'
import { nowPlayingPositionDropdown } from '../../../../common/helpers/helperUI'
import { useSelector } from 'react-redux'
import { IStore } from '../../../../redux/store/types'
import { IToken } from '../../../../redux/store/token/types'
import { setPlayerVolume } from '../../../../common/api/webapi/player'
import { ICurrentState } from '../../../../redux/store/currentState/types'

let timeout = 0

const RightButtons = () => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)
    const devicesDropdownRef = useRef<HTMLUListElement>(null)
    const [toggleDropdownVolume, setToggleDropdownVolume] = useState(false)
    const [volume, setVolume] = useState(100)

    useEffect(() => {
        if(accessToken){
            if(timeout)
                clearTimeout(timeout)
            timeout = setTimeout(() => {
                setPlayerVolume({accessToken, volume_percent: volume})
            },250)
        }
    },[volume, accessToken])

    useEffect(() => {
        if(devicesDropdownRef.current)
            nowPlayingPositionDropdown(devicesDropdownRef.current)
    },[devicesDropdownRef])

    const getVolumeIcon = () => {
        if(volume === 0)
            return <VolumeX/>
        else if(volume <= 25)
            return <Volume/>
        else if(volume <= 50)
            return <Volume1/>
        return <Volume2/>
    }

    return(
        <Right>
            <WrapperDropdown>
                <button onClick={() => setToggleDropdownVolume(old => !old)}>
                    {
                        getVolumeIcon()
                    }
                </button>
                <Dropdown show={toggleDropdownVolume} ref={devicesDropdownRef}>
                    <li>
                        <SpanVolumeControl>
                            <InputRange
                                value={volume}
                                onChange={e => setVolume(+e.target.value)}
                                type="range"
                                min="0" max="100"
                                disabled={Object.keys(currentState).length ? false : true}
                            />
                        </SpanVolumeControl>
                    </li>
                </Dropdown>
            </WrapperDropdown>
        </Right>
    )
}

export default RightButtons

const SpanVolumeControl = styled.span`
    display: inline-block;
    --widthInput: 15px;
    --heightInput: 130px;
    --spacingWidth: 30px;
    --spacingHeight: 30px;
    --additionThumbSize: 5px;
    height: calc( var(--heightInput) + var(--spacingHeight));
    width: calc( var(--widthInput) + var(--spacingWidth));

    ${InputRange}{
        height: var(--widthInput);
        width: var(--heightInput);
        margin: calc( var(--heightInput) / 3 ) 0 0 0;
        --translateY: calc( var(--heightInput) / -2 + var(--widthInput) / 2 + var(--spacingWidth) / 2);
        --translateX: calc(var(--spacingHeight) / -2 + var(--additionThumbSize) / -2);
        transform: rotate(-90deg) translateY(var(--translateY)) translateX(var(--translateX));
        appearance: vertical-mode;

        &::-webkit-slider-thumb{
            appearance: none;
            --sizeThumb: calc( var(--widthInput) + var(--additionThumbSize) );
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
            background: ${colors.gray};
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
            &::-webkit-slider-runnable-track{
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