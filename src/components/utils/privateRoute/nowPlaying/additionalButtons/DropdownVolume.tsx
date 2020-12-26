import React, { useEffect } from 'react'
import useNowPlayingVolume from '../../../../../common/hooks/components/nowPlaying/useNowPlayingVolume'
import {NowPlayingDropdown as dropdown, VolumeControl, RangeBar} from '../style'
import {breakpoints, InputRange} from '../../../../../styles/style'
import { useSelector } from 'react-redux'
import { IStore } from '../../../../../redux/store/types'
import { ICurrentState } from '../../../../../redux/store/currentState/types'
import { UpdateFatherVolume } from '../types'
import styled from 'styled-components'

interface Props{
    show: boolean
    updateFatherVolume: UpdateFatherVolume
}

const DropdownVolume: React.FC<Props> = ({show, updateFatherVolume}) => {
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)
    const {volume, setVolume, dropdownRef} = useNowPlayingVolume()

    useEffect(() => {
        updateFatherVolume(volume)
    },[volume, updateFatherVolume])

    return(
        <Dropdown show={show} ref={dropdownRef}>
            <li>
                <VolumeControl>
                    <InputRange
                        value={volume}
                        onChange={e => setVolume(+e.target.value)}
                        type="range"
                        min="0" max="100"
                        disabled={Object.keys(currentState).length ? false : true}
                    />
                    <RangeBar volume={volume}/>
                </VolumeControl>
            </li>
        </Dropdown>
    )
}

export default DropdownVolume

const Dropdown = styled(dropdown)`
    min-width: calc(var(--widthInput) + var(--spacingWidth));

    @media(max-width: ${breakpoints.tbp}){
        left: inherit;
        right: 0;
    }
`