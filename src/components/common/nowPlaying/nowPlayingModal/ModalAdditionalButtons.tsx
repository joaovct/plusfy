import React from 'react'
import styled from 'styled-components'
import { Devices } from '@material-ui/icons'
import { getVolumeIcon } from '../../../../common/helpers/helperNowPlaying'
import useNowPlayingAdditionalButtons from '../../../../common/hooks/components/nowPlaying/useNowPlayingAdditionalButtons'
import DropdownDevices from '../additionalButtons/DropdownDevices'
import DropdownVolume from '../additionalButtons/DropdownVolume'
import {Controls, Button} from './style'

const ModalAdditionalButtons = () => {
    const {toggleDropdowns, handleToggleDropdowns, volume, updateFatherVolume} = useNowPlayingAdditionalButtons()

    return(
        <Controls>
            <WrapperDropdown>
                <Button onClick={() => handleToggleDropdowns(0)}>
                    <Devices/>
                </Button>
                <DropdownDevices
                    show={toggleDropdowns[0]}
                    handleToggleDropdowns={handleToggleDropdowns}
                />
            </WrapperDropdown>
            <WrapperDropdown>
                <Button onClick={() => handleToggleDropdowns(1)}>
                    {getVolumeIcon(volume)}
                </Button>
                <DropdownVolume
                    show={toggleDropdowns[1]}
                    updateFatherVolume={updateFatherVolume}
                />
            </WrapperDropdown>
        </Controls>
    )
}

export default ModalAdditionalButtons

const WrapperDropdown = styled.div`
    position: relative;
    height: 100%;
`