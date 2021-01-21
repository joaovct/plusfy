import React from 'react'
import styled from 'styled-components'
import MainResult from './MainResult'
import SectionDivider from './SectionDivider'
import MoodPlaylists from './MoodPlaylists'
import { Container as container } from '../styles'
import useManageScreenMood from '../../../common/hooks/components/mood/useManageScreenMood'

const MoodResults = () => {
    const css = useManageScreenMood({target: 'success'})

    return(
        <Container css={css}>
            <MainResult/>
            <SectionDivider/>
            <MoodPlaylists/>
        </Container>
    )
}

const Container = styled(container)`
    width: 100%;
    align-items: center;
`

export default MoodResults