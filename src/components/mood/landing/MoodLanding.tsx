import React, {useEffect} from 'react'
import { metrics, colors, Title, Text, Button, FieldsetSelect, breakpoints, PrivateRouteComponent } from '../../../styles/style'
import useMoodThumbnails from '../../../common/hooks/components/mood/landing/useMoodThumbnails'
import styled from 'styled-components'
import ThumbnailTrack from './ThumbnailTrack'
import useAddGlobalStyles from '../../../common/hooks/useAddGlobalStyles'

const MoodLanding = () => {
    const {tracksImages,artistsImages,updateSelect} = useMoodThumbnails()
    const addGlobalStyles = useAddGlobalStyles()

    useEffect(() => {
        if(artistsImages.length){
            const css = generateCSS(artistsImages)
            addGlobalStyles(css,'/mood')
        }

    //eslint-disable-next-line
    },[artistsImages])


    return(
        <Content>
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
                        <select onChange={updateSelect} defaultValue="medium_term">
                            <option value="long_term">Todo o tempo</option>
                            <option value="medium_term">6 meses</option>
                            <option value="short_term">Último mês</option>
                        </select>
                    </FieldsetSelect>
                </span>
                <Button>Começar</Button>
            </SelectRange>
        </Content>
    )
}

function generateCSS(images: string[]): string{
    const keyframesBackground = getBackgroundKeyframes(images)
    console.log(keyframesBackground)
    
    return `
        @media(max-width: ${breakpoints.tbp}){
            ${PrivateRouteComponent}, ${PrivateRouteComponent} *{
                z-index: 1;
            }

            ${PrivateRouteComponent}{
                &:before{
                    content: '';
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100vh;
                    width: 100vw;
                    pointer-events: none;
                    user-select: none;
                    background: ${colors.darkerBackgroundTranslucent};
                }
            }

            ${keyframesBackground}
        }
    `
}

function getBackgroundKeyframes(images: string[]): string{
    return `
        ${PrivateRouteComponent}{
            animation: ${10 * images.length}s background forwards;
            animation-iteration-count: infinite; 
            transition: 0s background-image;
            background-image: url(${images[0]});
            background-size: cover;
            &:before{
                transition: .25s opacity;
            }

            @keyframes background{
                ${images.map((image, index) => {
                    const percentage = 100 / (images.length + 1) * index + '%'
                    console.log(percentage)
                    return`
                        ${percentage}{
                            background-image: url(${image});
                        }
                    `
                }).join('')}
                ${(() => `
                    100%{
                        background-image: url(${images[0]});
                    }
                `)()}
            }

            @keyframes opacity{
                0%{
                    opacity: 1;
                }
                50%{
                    opacity: 0;
                }
                100%{
                    opacity: 1;
                }
            }
        }
    `
}

// ${images.map((image, index) => {
//     const percentage = 100 / (images.length + 1) * (index + 1) + '%'
//     return`
//         ${percentage}{
//             background-image: url(${image});
//             &:before{
//                 opacity: 0;
//             }
//         }
//     `
// }).join('')}

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
        margin: ${metrics.spacing3} 0 0 0;
    }

    @media(max-width: ${breakpoints.sml}){
        span{
            flex-flow: column nowrap;

            ${FieldsetSelect}{
                margin: 10px 0 0 0;
            }
        }

        ${Button}{
            margin: ${metrics.spacing3} 0 0 0;
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

    /* @media(max-width: ${breakpoints.tbp}){
        width: 100%;
        order: 1;
        grid-template-columns: repeat(8, 1fr);
        justify-content: center;
        grid-auto-flow: dense;
        gap: 0;
    }
    @media(max-width: 380px){
        grid-template-columns: repeat(4, 1fr);
    } */
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

const Content = styled.div`
    width: 100%;
    flex: 1 1 auto;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
`

export default MoodLanding