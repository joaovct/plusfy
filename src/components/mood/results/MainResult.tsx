import React from 'react'
import { breakpoints, Text, Title } from '../../../styles/style'
import styled from 'styled-components'
import useMoodContext from '../../../common/hooks/components/mood/useMoodContext'
import { getMoodDescription, getMoodAnimation, getMoodTitle } from '../../../common/helpers/helperMood'
import { Mood } from '../types'

const MainResult = () => {
    const {results} = useMoodContext()

    return(
        <MainResultStyled>
            <Subtitle>O seu principal mood é:</Subtitle>
            <MoodIcon mood={results?.mood}>
                <video autoPlay loop>
                    <source src={getMoodAnimation(results?.mood || '')} type="video/webm"/>
                </video>
            </MoodIcon>
            <Description>
                <Title>{getMoodTitle(results?.mood || '')}</Title>
                <Text>{getMoodDescription(results?.mood || '')}</Text>
            </Description>
        </MainResultStyled>
    )
}

const Description = styled.article`
    width: 100%;
    margin: 20px 0 0 0;

    ${Title}{
        font-size: 50px;
        font-weight: 900;
        font-family: merriweather;
        text-align: center;
        letter-spacing: 1.2px;
    }
    ${Text}{
        margin: 10px 0 0 0;
        text-align: center;
    }

    @media(max-width: ${breakpoints.tbp}){
        ${Title}{
            font-size: 45px;
        }
        ${Text}{
            font-size: 18px;
        }
    }

    @media(max-width: ${breakpoints.sml}){
        ${Title}{
            font-size: 40px;
        }
        ${Text}{
            font-size: 16px;
        }
    }
    @media(max-width: ${breakpoints.smp}){
        ${Title}{
            font-size: 35px;
        }
        ${Text}{
            font-size: 16px;
        }
    }
`

const MoodIcon = styled.figure<{mood: Mood | undefined}>`
    --sizeVideo: 200px;
    margin: 20px 0 0 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    video{
        height: var(--sizeVideo);
        width: var(--sizeVideo);
        filter: brightness(.95);
        user-select: none;
    }

    ${({mood}) => {
        if(mood === 'energetic')
            return `
                height: var(--sizeVideo);
                width: var(--sizeVideo);

                video{
                    height: calc(var(--sizeVideo) + 50px);
                    width: calc(var(--sizeVideo) + 50px); 
                    position: relative;
                    top: -12.5px;
                }
            `
    }}

    @media(max-width: ${breakpoints.tbl}){
        --sizeVideo: 175px;
    }

    @media(max-width: ${breakpoints.sml}){
        --sizeVideo: 150px;
    }
`

const Subtitle = styled(Text)`
    font-weight: 500;
    margin: 0;
`

const MainResultStyled = styled.div`
    width: 100%;
    max-width: 525px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
`

export default MainResult