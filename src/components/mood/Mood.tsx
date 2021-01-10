import React  from 'react'
import styled from 'styled-components'
import useMoodThumbnails from '../../common/hooks/components/mood/landing/useMoodThumbnails'
import { metrics, colors, Page, Container as container, Title, Text, Button, FieldsetSelect } from '../../styles/style'
import ThumbnailTrack from './landing/ThumbnailTrack'

const Mood = () => {
    const {thumbnailsTracks, updateSelect} = useMoodThumbnails()

    return(
        <Page>
            <Container>
                <Content>
                    <Article>
                        <GridThumbnailTracks>
                            {
                                [0,1,2,3,4,5].map((_, index) => (
                                    <ThumbnailTrack
                                        key={`mood-thumbnailtrack-${index}`}
                                        {...thumbnailsTracks[index] || {name: '', imgSrc: ''}}
                                    />
                                ))
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
            </Container>
        </Page>
    )
}

const SelectRange = styled.div`
    margin: ${metrics.spacing5} 0 0 0;
    width: auto;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

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
        }
    }

    ${Button}{
        margin: ${metrics.spacing2} 0 0 0;
        min-width: inherit;
        width: inherit;
        padding: 8px 32px;
        background: ${colors.primary};
        font-weight: 500;
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
    }
    ${Text}{
        font-size: calc(var(--titleFontSize) / 1.6);
        font-weight: 500;
    }
`

const GridThumbnailTracks = styled.div`
    display: grid;
    --sizeThumbnail: 160px;
    grid-template-columns: repeat(3, minmax(var(--sizeThumbnail), 1fr));
    gap: 20px;
`

const Article = styled.article`
    flex: 1 1 auto;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Content = styled.div`
    width: 100%;
    flex: 1 1 auto;
    display: flex;
    flex-flow: column nowrap;
`

const Container = styled(container)`
    flex: 1 1 auto;
    display: flex;
    flex-flow: column nowrap;
`

export default Mood