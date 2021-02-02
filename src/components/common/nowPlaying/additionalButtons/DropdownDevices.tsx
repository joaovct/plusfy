import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import useNowPlayingDevices from '../../../../common/hooks/components/nowPlaying/useNowPlayingDevices'
import { breakpoints, colors, Title } from '../../../../styles/style'
import {NowPlayingDropdown} from '../style'
import {HandleToggleDropdowns} from '../types'

interface Props{
    show: boolean
    handleToggleDropdowns: HandleToggleDropdowns
}

const DropdownDevices: React.FC<Props> = ({show, handleToggleDropdowns}) => {
    const {devices, dropdownRef, chooseDevice, getDeviceIcon, updateDevices} = useNowPlayingDevices()

    useEffect(() => {
        if(show)
            updateDevices()
    //eslint-disable-next-line
    },[show])

    return(
        <Dropdown show={show} ref={dropdownRef}>
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
                            onClick={() => {chooseDevice(device.id); handleToggleDropdowns(0)}}
                            active={device.is_active}
                            key={`dropdowndevices-${device.id}-${index}`}
                            style={{fontSize: "large"}}
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
        </Dropdown>
    )
}

const DeviceItem = styled.li<{active: boolean}>`
    &:nth-child(n+0){
        transition: var(--iconOpacityTransition);

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

const Dropdown = styled(NowPlayingDropdown)`
    width: 270px;
    max-height: 270px;
    overflow-y: auto;

    @media(max-width: ${breakpoints.tbp}){
        right: inherit;
        left: 0;
    }

    @media(max-width: ${breakpoints.sml}){
        width: calc(100vw - var(--sideSpacingModal) - var(--sideSpacingModal));
        max-width: 350px;
        max-height: 370px;
    }

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

export default DropdownDevices