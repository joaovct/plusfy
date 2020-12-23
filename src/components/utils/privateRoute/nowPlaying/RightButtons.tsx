import React from 'react'
import styled, { css } from 'styled-components'
import { Dropdown as dropdown, metrics, InputRange, colors, Title, breakpoints } from '../../../../styles/style'
import { useSelector } from 'react-redux'
import { IStore } from '../../../../redux/store/types'
import { ICurrentState } from '../../../../redux/store/currentState/types'
import useNowPlayingRightButtons from '../../../../common/hooks/components/nowPlaying/useNowPlayingRightButtons'
import {Headphones} from 'react-feather'

const RightButtons = () => {
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)
    const {volume, setVolume, toggleDropdowns, handleToggleDropdowns, devices, volumeDropdownRef, devicesDropdownRef, chooseDevice, getVolumeIcon, getDeviceIcon} = useNowPlayingRightButtons()

    return(
        <Right>
            <WrapperDropdown>
                <button onClick={() => handleToggleDropdowns(0)}>
                    <Headphones/>
                </button>
                <DropdownDevices show={toggleDropdowns[0]} ref={devicesDropdownRef}>
                    <li>
                        <span>
                            <Title>Conectar a um dispositivo</Title>
                        </span>
                    </li>
                    {devices.length ?
                    <>
                        {
                            devices.map((device, index) => (
                                <DeviceItem
                                    aria-label="Escolher dispositivo"
                                    onClick={() => chooseDevice(device.id)}
                                    active={device.is_active}
                                    key={`dropdowndevices-${device.id}-${index}`}
                                >
                                    <span>
                                        {getDeviceIcon(device.type)}
                                        <strong>{device.name}</strong>
                                    </span>
                                </DeviceItem>
                            ))
                        }
                    </>
                    : <li>
                        <span>
                            <p>Abra o Spotify em um dispositivo usando essa mesma conta e ele aparecerá aqui.</p>
                        </span>
                    </li>}
                </DropdownDevices>
            </WrapperDropdown>
            <WrapperDropdown>
                <button onClick={() => handleToggleDropdowns(1)}>
                    {getVolumeIcon()}
                </button>
                <Dropdown show={toggleDropdowns[1]} ref={volumeDropdownRef}>
                    <li>
                        <SpanVolumeControl>
                            <InputRange
                                value={volume}
                                onChange={e => setVolume(+e.target.value)}
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

const DeviceItem = styled.li<{active: boolean}>`
    &:nth-child(n+0){
        transition: .25s background;

        span{
            cursor: pointer;
            width: 100%;
            display: flex;
            align-items: center;
            flex-flow: row nowrap;

            svg{
                opacity: 1;
                height: 32px;
                width: 32px;
                margin: 0 10px 0 0;
                stroke-width: 1px;
                *{
                    stroke-width: 1px;
                }
            }

            strong{
                font-size: 14px;
                font-weight: 500;
                text-transform: capitalize;
            }

            ${({active}) => active === true ? css`
                svg *, strong{
                    color: ${colors.primary};
                }
            ` : ''}
        }
        
        &:hover{
            background: ${colors.darkerBackground};
        }
    }
`

const DropdownDevices = styled(Dropdown)`
    width: 270px;
    max-height: 270px;
    overflow-y: auto;

    li span{
        cursor: default;
        ${Title}{
            text-align: center;
            font-size: 20px;
            font-weight: 600;
            line-height: 1.2;
        }

        p{
            font-size: 1rem;
            color: ${colors.gray};
            text-align: center;
        }
    }
    
    &::-webkit-scrollbar {
        display: none;
        width: 0px;
        background: transparent;
    }
`

const WrapperDropdown = styled.div`
    height: 100%;
    position: relative;
    padding: 0 var(--innerPaddingHorizontal);
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
    overflow-y: visible;
    padding: var(--innerPadding);
    padding-top: 0;
    padding-bottom: 0;  

    @media(max-width: ${breakpoints.tbp}){
        display: none;
    }
`