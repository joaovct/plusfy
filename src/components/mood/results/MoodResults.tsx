import React from 'react'
import styled from 'styled-components'
import MainResult from './MainResult'
import SectionDivider from './SectionDivider'
import MoodPlaylists from './MoodPlaylists'

const MoodResults = () => {
    return(
        <Content>
            <MainResult/>
            <SectionDivider/>
            <MoodPlaylists/>
        </Content>
    )
}

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
`

export default MoodResults