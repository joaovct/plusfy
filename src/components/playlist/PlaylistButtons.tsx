import React, { useCallback, useState } from 'react'
import { Button, colors, metrics } from '../../styles/style'
import styled from 'styled-components'
import {MoreHorizontal} from 'react-feather'
import { PlaylistChildComponent } from './types'
import { playTrack } from '../../api/webapi/player'
import { useSelector } from 'react-redux'
import { Istore } from '../../store/types'
import { Itoken } from '../../store/token/types'

const PlaylistButtons: React.FC<PlaylistChildComponent> = ({playlist}) => {
    const [showOptions, setShowOptions] = useState(false)
    const toggleOptions = useCallback(() => setShowOptions(old => !old),[])
    const {accessToken} = useSelector<Istore, Itoken>(store => store.token)

    const handlePlayPlaylist = useCallback(() => 
        playTrack({accessToken, contextUri: playlist.uri})
    ,[playlist, accessToken])

    return (
        <WrapperButtons>
            <Button onClick={handlePlayPlaylist}> Play </Button>
            <MoreOptions>
                <figure onClick={toggleOptions}>
                    <MoreHorizontal/>
                </figure>
                <Options show={showOptions}>
                    <li>Salvar na Minha Biblioteca</li>
                    <li>Copiar playlist</li>
                </Options>
            </MoreOptions>
        </WrapperButtons>
    )
}

export default PlaylistButtons

const Options = styled.ul<{show: boolean}>`
    position: absolute;
    opacity: 0;
    user-select: none;
    pointer-events: none;
    transition: .25s opacity;
    z-index: 2;
    top: calc( var(--size-icon) + var(--spacing-icon) * 2 );
    left: calc( 100% - 25px );
    background: ${colors.background};
    border: 1px solid ${colors.border};
    border-radius: ${metrics.borderRadius};
    box-shadow: ${metrics.boxShadow};
    min-width: 250px;

    li{
        padding: 12px 16px;
        cursor: pointer;
    }

    ${ ({show}) => 
    show ? `
        opacity: 1;
        pointer-events: all;
        user-select: text;
    ` : ''
    }
`

const MoreOptions = styled.div`
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-end;
    --size-icon: 25px;
    --spacing-icon: 15px;

    figure{
        height: calc( var(--size-icon) + var(--spacing-icon) ); 
        width: calc( var(--size-icon) + var(--spacing-icon) );
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: 1px solid ${colors.border};
        border-radius: 100%;

        svg{
            height: var(--size-icon);
            width: var(--size-icon);
            transition: .25s opacity;
            opacity: .7;
        } 

        &:hover svg{
            opacity: 1;
        }
    }
`

const WrapperButtons = styled.div`
    margin: ${metrics.spacing3} 0 0 0;
    display: flex;

    ${Button}{
        min-width: inherit;
        padding-top: 8px;
        padding-bottom: 8px;
        margin: 0 ${metrics.spacing3} 0 0;
    }
`