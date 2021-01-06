import React from 'react'
import {HomeRounded as Home, SearchRounded as Search, AudiotrackRounded as AudioTrack} from '@material-ui/icons'
import styled from 'styled-components'
import { colors, breakpoints } from '../../../styles/style'
import TabBarItem from './TabBarItem'

const TabBar = () => {
    return(
        <TabBarStyled>
            <TabBarItem
                pathname="/home"
                icon={<Home/>}
                text="Home"
            />
            <TabBarItem
                pathname="/search"
                icon={<Search/>}
                text="Busca"
            />
            <TabBarItem
                pathname="/my-library"
                icon={<AudioTrack/>}
                text="Biblioteca"
            />
        </TabBarStyled>
    )
}

export default TabBar

const TabBarStyled = styled.nav`
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    padding: 10px 0;
    background: ${colors.darkerBackground};
    border-top: 1px solid ${colors.border};

    @media(min-width: ${breakpoints.tbp}){
        display: none;
    }
`