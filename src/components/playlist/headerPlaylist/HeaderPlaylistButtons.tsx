import React, { useCallback, useContext, useState } from 'react'
import { Button, colors, metrics, Dropdown as dropdown, breakpoints } from '../../../styles/style'
import styled from 'styled-components'
import {MoreHorizontal} from 'react-feather'
import { playPlayer } from '../../../common/api/webapi/player'
import { useSelector } from 'react-redux'
import { IStore } from '../../../redux/store/types'
import { IToken } from '../../../redux/store/token/types'
import ContextPlaylist from '../ContextPlaylist'

const HeaderPlaylistButtons = () => {
    const {playlist} = useContext(ContextPlaylist)
    const [showOptions, setShowOptions] = useState(false)
    const toggleOptions = useCallback(() => setShowOptions(old => !old),[])
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)

    const handlePlayPlaylist = useCallback(() => playlist
        ? playPlayer({accessToken, contextUri: playlist.uri})
        : null
    ,[playlist, accessToken])

    return ( 
        <WrapperButtons>
            <Button onClick={handlePlayPlaylist}> Play </Button>
            <MoreOptions>
                <figure onClick={toggleOptions}>
                    <MoreHorizontal/>
                </figure>
                <Dropdown show={showOptions}>
                    <li>
                        <span>Copiar playlist</span>
                    </li>
                </Dropdown>
            </MoreOptions>
        </WrapperButtons>
    )
}

export default HeaderPlaylistButtons

const Dropdown = styled(dropdown)`
    top: calc( 100% );

    @media(max-width: ${breakpoints.sml}){
        left: inherit;
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

    @media(max-width: ${breakpoints.tbp}){
        justify-content: center;

        ${Button}{
            padding-top: 4px;
            padding-bottom: 4px;
        }
    }
`