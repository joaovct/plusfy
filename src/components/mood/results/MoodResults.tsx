import React from 'react'
import styled from 'styled-components'
import MainResult from './MainResult'
import SectionDivider from './SectionDivider'
import MoodPlaylists from './MoodPlaylists'
import { Container as container } from '../styles'
import useManageScreenMood from '../../../common/hooks/components/mood/useManageScreenMood'
import useMoodContext from '../../../common/hooks/components/mood/useMoodContext'
import { colors } from '../../../styles/style'

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
                    <Inspired>
                        Inspired by <a href="http://moooodify.com" target="_blank" rel="noopener noreferrer">moooodify</a>.
                    </Inspired>
                </>
                : <></>
            }
        </Container>
    )
}

const Inspired = styled.span`
    display: inline-block;
    width: 100%;
    text-align: center;
    
    &, a{
        font-size: 14px;
        color: ${colors.gray};
    }

    a{
        text-decoration: underline;
    }
`

const Container = styled(container)`
    width: 100%;
    align-items: center;
`

export default MoodResults