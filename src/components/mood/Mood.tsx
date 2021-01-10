import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { metrics, colors, Page, Title, Text, Button, FieldsetSelect } from '../../styles/style'
import {Track, UserTopArtistsAndTracksTimeRange} from '../../common/api/webapi/types' 
import { getUserTopArtistsAndTracks } from '../../common/api/webapi/personalization'
import { useSelector } from 'react-redux'
import { IStore } from '../../redux/store/types'
import { IToken } from '../../redux/store/token/types'
import { ThumbnailTrack as ThumbnailTrackType } from './landing/types'
import ThumbnailTrack from './landing/ThumbnailTrack'

const Mood = () => {
    const [timeRange, setTimeRange] = useState<UserTopArtistsAndTracksTimeRange>('medium_term')
    const [thubnailTracks, setThumbnailTracks] = useState<ThumbnailTrackType[]>([])
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const isMounted = useRef(true)

    useEffect(() => () => {
        isMounted.current = false
    },[])

    useEffect(() => {
        if(accessToken){
            fetchData()
            getUserTopArtistsAndTracks(accessToken, "tracks", {time_range: timeRange})
        }
        async function fetchData(){
            const data = await getUserTopArtistsAndTracks<Track>(accessToken, "tracks", {time_range: timeRange})
            if(isMounted.current && data.items.length){
                const nItems = 6
                let tracks: ThumbnailTrackType[] = []
                for(let i = 0; i < nItems; i++){
                    let alreadyUsed = true
                    do{
                        const index = Math.floor(Math.random() * (data.items.length))
                        alreadyUsed = !tracks.every(track => data.items[index]?.album.images[0] && data.items[index]?.album.images[0].url && track.imgSrc !== data.items[index]?.album.images[0].url)
                        if(!alreadyUsed){
                            const track = {name: data.items[index]?.name || '', imgSrc: data.items[index]?.album.images[0].url || ''}
                            tracks = [...tracks, track]
                        }
                    }while(alreadyUsed)
                }
                setThumbnailTracks(tracks)
            }
        }
    },[timeRange, accessToken])

    const updateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value === "long_term" || e.target.value === "medium_term" || e.target.value === "short_term"){
            setTimeRange(e.target.value)
        }
    }

    return(
        <Page>
            <Content>
                <Article>
                    <GridThumbnailTracks>
                        {
                            thubnailTracks.map((track, index) =>
                                <ThumbnailTrack key={`mood-thumbnailtrack-${index}`} {...track}/>
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
    margin: ${metrics.spacing5} 0 auto 0;
`

const Content = styled.div`
    width: 100%;
    flex: 1 1 auto;
    display: flex;
    flex-flow: column nowrap;
`

export default Mood