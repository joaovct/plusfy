import React, { useEffect } from 'react'
import { metrics, colors, Title, Text, Button, FieldsetSelect, breakpoints } from '../../../styles/style'
import { Container as container } from '../styles'
import { generateCSS } from '../helper'
import useMoodThumbnails from '../../../common/hooks/components/mood/landing/useMoodThumbnails'
import styled from 'styled-components'
import ThumbnailTrack from './ThumbnailTrack'
import useAddGlobalStyles from '../../../common/hooks/useAddGlobalStyles'
import useMoodContext from '../../../common/hooks/components/mood/useMoodContext'
import useManageScreenMood from '../../../common/hooks/components/mood/useManageScreenMood'
import { minAwaitTimingFade } from '../../../common/hooks/components/mood/types'

const MoodLanding = () => {
    const css = useManageScreenMood({target: "initial", active: true})
    const { status, loadMood } = useMoodContext()
    const { tracksImages, artistsImages, updateSelect } = useMoodThumbnails()
    const addGlobalStyles = useAddGlobalStyles()

    useEffect(() => {
        if(status === 'initial' && artistsImages.length){
            const css = generateCSS(artistsImages)
        
            setTimeout(() => {
                addGlobalStyles(css, '/mood')
            },minAwaitTimingFade)
        
        }else if(status !== 'initial'){
            addGlobalStyles('', '/mood')
        }
    //eslint-disable-next-line
    },[artistsImages, status])

    return(
        <Container css={css}>
            <Article>
                <GridThumbnailTracks>
                    {
                        tracksImages.map((trackImage, index) =>
                            <ThumbnailTrack key={`mood-thumbnailtrack-${index}`} {...trackImage}/>
                        )
                    }
                </GridThumbnailTracks>
                <MainText>
                    <Title>Qual o seu <br/> mood?</Title>
                    <Text>O sentimento de suas <br/> músicas mais ouvidas.</Text>
                </MainText>
            </Article>
            <SelectRange>
                <span>
                    <Text>Analisar faixas dos últimos:</Text>
                    <FieldsetSelect>
                        <select onChange={updateSelect} defaultValue="short_term">
                            <option value="long_term">Todo o tempo</option>
                            <option value="medium_term">6 meses</option>
                            <option value="short_term">Último mês</option>
                        </select>
                    </FieldsetSelect>
                </span>
                <Button onClick={loadMood}>Começar</Button>
            </SelectRange>
        </Container>
    )
}

const SelectRange = styled.div`
    margin: ${metrics.spacing5} 0 0 0;
    width: auto;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    --minWidth: 170px;

    span{
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        ${Text}{
            font-size: 15px;
            font-weight: 500;
            margin: 0;
        }

        ${FieldsetSelect}{
            margin: 0 0 0 10px;
            min-width: var(--minWidth);
        }
    }

    ${Button}{
        min-width: var(--minWidth);
        width: inherit;
        margin: ${metrics.spacing2} 0 0 0;
        padding: 8px 32px;
        background: ${colors.primary};
        font-weight: 500;
    }

    @media(max-width: ${breakpoints.tbp}){
        margin: 16px 0 0 0;
    }

    @media(max-width: ${breakpoints.sml}){
        span{
            flex-flow: column nowrap;

            ${FieldsetSelect}{
                margin: 8px 0 0 0;
            }
        }

        ${Button}{
            margin: 16px 0 0 0;
        }
    }
`

const MainText = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
    --titleFontSize: 50px;

    ${Title},${Text}{
        text-align: right;
    }
    ${Title}{
        font-size: var(--titleFontSize);
        font-weight: 600;
        line-height: 1.2;
    }
    ${Text}{
        font-size: calc(var(--titleFontSize) / 1.6);
        font-weight: 500;
    }

    @media(max-width: ${breakpoints.xlg}){
        --titleFontSize: 40px;
    }
    @media(max-width: ${breakpoints.lg}){
        --titleFontSize: 35px;
    }
    @media(max-width: ${breakpoints.tbl}){
        --titleFontSize: 30px;
    }
    @media(max-width: 700px){
        --titleFontSize: 28px;
    }
    @media(max-width: ${breakpoints.tbp}){
        width: 100%;
        align-items: center;
        --titleFontSize: 40px;

        ${Title}, ${Text}{
            width: 100%;
            text-align: center;
        }
        ${Title}{
            br{
                display: none;
            }
        }
        ${Text}{
            margin: ${metrics.spacing2} 0 0 0;
        }
    }
    @media(max-width: ${breakpoints.sml}){
        --titleFontSize: 35px;
    }
    @media(max-width: 380px){
        --titleFontSize: 32px;
    }
    @media(max-width: 330px){
        --titleFontSize: 30px;
    }
    @media(max-width: ${breakpoints.smp}){
        --titleFontSize: 25px;
    }
`

const GridThumbnailTracks = styled.div`
    display: grid;
    --sizeThumbnail: 160px;
    grid-template-columns: repeat(3, minmax(var(--sizeThumbnail), 1fr));
    gap: 20px;
    position: relative;

    @media screen and (min-width: 1400px){
        --sizeThumbnail: 175px;
    }
    @media screen and (min-width: 1600px) {
        --sizeThumbnail: 190px;
    }
    @media screen and (min-width: 1900px) {
        --sizeThumbnail: 200px;
    }
    @media(max-width: ${breakpoints.xlg}){
        --sizeThumbnail: 150px;
    }
    @media(max-width: ${breakpoints.lg}){
        --sizeThumbnail: 140px;
        gap: 10px;
    }
    @media(max-width: 900px){
        --sizeThumbnail: 120px;
    }
    @media(max-width: ${breakpoints.tbl}){
        --sizeThumbnail: 120px;
    }
    @media(max-width: 700px){
        --sizeThumbnail: 100px;
    }

    @media(max-width: ${breakpoints.tbp}){
        display: none;
    }
`

const Article = styled.article`
    flex: 1 1 auto;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media(max-width: ${breakpoints.tbp}){
        flex: inherit;
        justify-content: center;
        align-items: center;
    }
`

const Container = styled(container)`
    width: 100%;
    justify-content: center;
`

export default MoodLanding