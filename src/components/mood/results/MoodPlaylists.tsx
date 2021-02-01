import React, { useRef } from 'react'
import styled from 'styled-components'
import { Title, Text, breakpoints} from '../../../styles/style'
import useMoodContext from '../../../common/hooks/components/mood/useMoodContext'
import { Mood } from '../types'
import MoodPlaylist from './MoodPlaylist'
const Macy = require('macy')

let macyInstance: any | undefined

const MoodPlaylists = () => {
    const { results } = useMoodContext()
    const playlistsRef = useRef<HTMLDivElement>(null)

    const handlePlaylistUpdate = () => {
        if(macyInstance){
            macyInstance.reInit()
        }
    }

    const mountMansory = () => {
        const selector = '.' + playlistsRef.current?.className.replace(' ', '.')
        macyInstance = Macy({
            container: selector,
            margin: 16,
            columns: 4,
            trueOrder: true,
            breakAt: {
                1400: 3,
                991: 2,
                600: 1
            }
        })
    }

    const renderPlaylist = (mood: Mood, index: number): JSX.Element => {
        if(playlistsRef.current && index === Object.keys(results?.tracks || {}).length - 1){
            mountMansory()
        }

        if(results && results.tracks[mood] && results.tracks[mood].length)
            return (
                <MoodPlaylist
                    key={`mood-moodplaylists-playlist-${mood}${index}`}
                    mood={mood}
                    tracks={results.tracks[mood]}
                    handlePlaylistUpdate={handlePlaylistUpdate}
                />
            )
        return <></>
    }

    return(
        <Content>
            <Title>Para você <br/> continuar ouvindo</Title>
            <Text>Criamos algumas playlists separadas por mood <br/> com base em suas músicas.</Text>
            <Playlists ref={playlistsRef}>
                {   
                    //@ts-ignore
                    Object.keys(results?.tracks || {}).map(renderPlaylist)
                }
            </Playlists>
        </Content>
    )
}

const Playlists = styled.div`
    width: 100%;
    margin: 34px 0 0 0;
`

const Content = styled.section`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    ${Title}, ${Text}{
        margin: 0;
        text-align: center;
    }

    ${Title}{
        br{
            display: none;
        }
    }

    ${Text}{
        margin: 10px 0 0 0;
    }

    @media(max-width: ${breakpoints.tbp}){
        ${Title}{
            font-size: 28px;
            line-height: 1.2;
        }
        ${Text}{
            font-size: 16px;
        }
    }

    @media(max-width: ${breakpoints.sml}){
        ${Title}{
            font-size: 24px;

            br{
                display: inherit;
            }
        }
        ${Text}{
            font-size: 14px;
        }
    }

    @media(max-width: 400px){
        ${Text}{
            br{
                display: none;
            }
        }
    }
`

export default MoodPlaylists