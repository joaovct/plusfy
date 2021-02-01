import React from 'react'
import styled from 'styled-components'
import loadingAnimation from '../../../assets/mood/loading-animation.webm'
import useManageScreenMood from '../../../common/hooks/components/mood/useManageScreenMood'
import { Title, Text, breakpoints } from '../../../styles/style'
import { Container } from '../styles'

const MoodLoading = () => {
    const css = useManageScreenMood({target: 'loading'})

    return(
        <Container css={css}>
            <Loading>
                <Animation autoPlay loop>
                    <source src={loadingAnimation} type="video/webm"/>
                </Animation>
                <Title>Um momento...</Title>
                <Text>Estamos analisando suas músicas</Text>
            </Loading>
        </Container>
    )
}

const Animation = styled.video`
    --size: 175px;
    height: var(--size);
    width: var(--size);
    filter: brightness(.95);
    user-select: none;

    @media(max-width: ${breakpoints.smp}){
        --size: 150px;
    }
`

const Loading = styled.div`
    height: 100%;
    width: 100%;
    flex: 1 0 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    ${Title}{
        margin: 32px 0 0 0;
    }

    ${Text}{
        margin: 10px 0 0 0;
        
        @media(max-width: ${breakpoints.smp}){
            font-size: 16px;
        }
        @media(max-width: calc(${breakpoints.smp} + 20px)){
            font-size: 14px;
        }
    }

    ${Title}, ${Text}{
        text-align: center;
        
        @media(max-width: ${breakpoints.sml}){
            margin: 0;
        }
    }
`

export default MoodLoading