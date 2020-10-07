import React, {useEffect, useRef} from 'react'
import {MoreVertical} from 'react-feather'
import styled from 'styled-components'
import { positionOptionsElement } from '../../helpers/HelperUI'
import { Dropdown } from '../../styles/style'

interface ITrackOptions{
    showOptions: Array<Boolean>
    handleShowOptions: Function
    index: number
}

const TrackOptions: React.FC<ITrackOptions> = ({showOptions, handleShowOptions, index}) => {
    const optionsRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
        if(optionsRef.current) positionOptionsElement(optionsRef.current)
    },[optionsRef])

    return (
        <>
            <MoreVertical onClick={ () => handleShowOptions(index)} />
            <Options ref={optionsRef} show={showOptions[index]}>
                <li>
                    <span>Salvar na biblioteca</span>
                </li>
                <li>
                    <span>Adicionar a fila</span>
                </li>
                <li>
                    <span>Adicionar a playlist</span>
                </li>
                <li>
                    <span>Remover dessa playlist</span>
                </li>
                <li>
                    <span>Desabilitar nessa playlist</span>
                </li>
            </Options>
        </>

    )
}

export default TrackOptions

const Options = styled(Dropdown)`
    top: inherit;
    left: inherit;
    right: 100%;
    bottom: inherit;
    margin: 0;
    transition: .2s opacity;

    li{
        cursor: pointer;
    }
`