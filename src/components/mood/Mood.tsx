import React  from 'react'
import styled from 'styled-components'
import { Page as page } from '../../styles/style'
import MoodLanding from './landing/MoodLanding'
import MoodLoading from './loading/MoodLoading'
import MoodResults from './results/MoodResults'
import MoodContext from './ContextMood'
import useMood from '../../common/hooks/components/mood/useMood'

const Mood = () => {
    const moodValues = useMood()

    return(
        <MoodContext.Provider value={{...moodValues}}>
            <Page>
                <MoodLanding/>
                <MoodLoading/>
                <MoodResults/>
            </Page>
        </MoodContext.Provider>
    )
}

const Page = styled(page)`
    position: relative;
`

export default Mood