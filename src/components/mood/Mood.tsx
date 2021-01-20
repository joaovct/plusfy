import React  from 'react'
import styled from 'styled-components'
import { Page as page, Container as container } from '../../styles/style'
import MoodLanding from './landing/MoodLanding'
// import MoodLoading from './loading/MoodLoading'
// import MoodResults from './results/MoodResults'

const Mood = () => {

    return(
        <Page>
            <Container>
                <MoodLanding/>
                {/* <MoodLoading/> */}
                {/* <MoodResults/> */}
            </Container>
        </Page>
    )
}

const Container = styled(container)`
    flex: 1 1 auto;
    display: flex;
    flex-flow: column nowrap;
`

const Page = styled(page)`
    position: relative;
`

export default Mood