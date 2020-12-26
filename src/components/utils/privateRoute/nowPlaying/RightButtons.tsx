import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '../../../../styles/style'
import {DevicesRounded as Devices} from '@material-ui/icons'
import { getVolumeIcon } from '../../../../common/helpers/helperNowPlaying'
import useNowPlayingAdditionalButtons from '../../../../common/hooks/components/nowPlaying/useNowPlayingAdditionalButtons'
import DropdownDevices from './additionalButtons/DropdownDevices'
import DropdownVolume from './additionalButtons/DropdownVolume'

const RightButtons = () => {
    const {toggleDropdowns, volume, updateFatherVolume, handleToggleDropdowns} = useNowPlayingAdditionalButtons()    

    return(
        <Right>
            <WrapperDropdown>
                <button onClick={() => handleToggleDropdowns(0)}>
                    <Devices/>
                </button>
                <DropdownDevices
                    show={toggleDropdowns[0]}
                    handleToggleDropdowns={handleToggleDropdowns}
                />
            </WrapperDropdown>
            <WrapperDropdown>
                <button onClick={() => handleToggleDropdowns(1)}>
                    {getVolumeIcon(volume || 100)}
                </button>
                <DropdownVolume
                    show={toggleDropdowns[1]}
                    updateFatherVolume={updateFatherVolume}
                />
            </WrapperDropdown>
        </Right>
    )
}

export default RightButtons

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