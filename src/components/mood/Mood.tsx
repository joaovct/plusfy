import React  from 'react'
import styled from 'styled-components'
import { Page, Container as container } from '../../styles/style'
import MoodLanding from './landing/MoodLanding'

const Mood = () => {

    return(
        <Page>
            <Container>
                <MoodLanding/>
            </Container>
        </Page>
    )
}

const Container = styled(container)`
    flex: 1 1 auto;
    display: flex;
    flex-flow: column nowrap;
`

export default Mood