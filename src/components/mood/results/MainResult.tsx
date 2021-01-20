import React from 'react'
import { breakpoints, Text, Title } from '../../../styles/style'
import dancerIcon from '../../../assets/mood/mood-dancer.png'
import styled from 'styled-components'

const MainResult = () => {
    return(
        <MainResultStyled>
            <Subtitle>O seu principal mood é:</Subtitle>
            <MoodIcon>
                <img src={dancerIcon} alt="Mood dancer"/>
            </MoodIcon>
            <Description>
                <Title>Dançante</Title>
                <Text>
                    A maioria das suas músicas tem uma sonoridade muito animada para uma boa dança.
                    É bem provável não consiga se segurar e comece a dançar enquanto escuta suas músicas.
                </Text>
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

const MoodIcon = styled.figure`
    margin: 40px 0 0 0;

    img{
        height: 125px;
        width: 125px;
    }

    @media(max-width: ${breakpoints.sml}){
        img{
            height: 100px;
            width: 100px;
        }
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