import React from 'react'
import styled from 'styled-components'
import MainResult from './MainResult'
import SectionDivider from './SectionDivider'
import MoodPlaylists from './MoodPlaylists'
import { Container as container } from '../styles'
import useManageScreenMood from '../../../common/hooks/components/mood/useManageScreenMood'
import useMoodContext from '../../../common/hooks/components/mood/useMoodContext'

const MoodResults = () => {
    const css = useManageScreenMood({target: 'success'})
    const {results} = useMoodContext()

    return(
        <Container css={css}>
            {
                results ?
                <>
                    <MainResult/>
                    <SectionDivider/>
                    <MoodPlaylists/>
                </>
                : <></>
            }
        </Container>
    )
}

const Container = styled(container)`
    width: 100%;
    align-items: center;
`

export default MoodResults