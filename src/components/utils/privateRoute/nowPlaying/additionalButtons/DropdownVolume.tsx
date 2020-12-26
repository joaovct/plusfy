import React, { useEffect } from 'react'
import useNowPlayingVolume from '../../../../../common/hooks/components/nowPlaying/useNowPlayingVolume'
import {NowPlayingDropdown as Dropdown, VolumeControl, RangeBar} from '../style'
import {InputRange} from '../../../../../styles/style'
import { useSelector } from 'react-redux'
import { IStore } from '../../../../../redux/store/types'
import { ICurrentState } from '../../../../../redux/store/currentState/types'
import { UpdateFatherVolume } from '../types'

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