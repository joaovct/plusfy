import React from 'react'
import styled, {css} from 'styled-components'
import { Title, Text, metrics, colors, PlaylistTableRow, Button as button, breakpoints, PlaylistTableRowProps} from '../../../styles/style'
import ListTracks from '../../common/listTracks/ListTracks'
import { Link } from 'react-router-dom'
import useMoodContext from '../../../common/hooks/components/mood/useMoodContext'
import { getMoodIcon, getMoodTitle } from '../../../common/helpers/helperMood'
import { Mood } from '../types'

const MoodPlaylists = () => {
    const { results } = useMoodContext()

    const renderPlaylist = (mood: Mood, index: number): JSX.Element => {
        if(results && results.tracks[mood]){

            return (
                <Playlist key={`mood-moodplaylists-playlist-${mood}${index}`}>
                    <PlaylistName>
                        {getMoodTitle(mood)}
                        <img src={getMoodIcon(mood)} alt={`${mood} playlist`}/>
                    </PlaylistName>
                    <ListTracks
                        tracks={results.tracks[mood].slice(0, 5)}
                        showHeader={false}
                        viewMode="simplified"
                        additionalCSS={listTracksCSS}
                    />
                    <SeeMore>
                        <Link to="#">Ver tudo</Link>
                    </SeeMore>
                    <Button>Salvar Playlist</Button>
                </Playlist>
            )    
    }
        return <></>
    }

    return(
        <Content>
            <Title>Para você <br/> continuar ouvindo</Title>
            <Text>Criamos algumas playlists separadas por mood <br/> com base em suas músicas.</Text>
            <Playlists>
                {   
                    //@ts-ignore
                    Object.keys(results?.tracks || {}).map(renderPlaylist)
                }
            </Playlists>
        </Content>
    )
}

const listTracksCSS = css<PlaylistTableRowProps>`
    width: 100%;

    ${PlaylistTableRow}{
        border-radius: 0;
        border-bottom: 1px solid ${colors.gray};

        &:nth-child(n+1), &:nth-child(n+1):hover{
            background: #fff;
        }

        div:nth-child(1){
            display: none;
        }
        div{
            padding-left: 0;
            padding-right: 0;

            img{
                height: 50px;
                width: 50px;
                border-radius: 6px;
                margin: 0 8px 0 0;
            }

            &:nth-child(2) span{
                justify-content: center;

                //increase selector
                strong:nth-child(n+1){
                    font-size: 18px;
                    font-weight: 600;
                    color: #000;

                    @media(max-width: ${breakpoints.sml}){
                        font-size: 16px;
                    }

                    @media(max-width: ${breakpoints.smp}){
                        font-size: 16px;
                    }
                }

                //increase selector
                small:nth-child(n+1){
                    font-size: 14px;
                    font-weight: 600;
                    color: ${colors.darkerGray};
                    margin: 0;
                }
            }

            &:last-child{
                svg{
                    stroke: ${colors.darkerGray};
                }
            }
        }
    }
`

const Button = styled(button)`
    //higher selector
    &:nth-child(n+1){
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        margin: 10px 0 0 0;
        min-width: inherit;
        padding: 8px 32px;
        background: ${colors.primary};

        &:hover{
            background: ${colors.primary};
        }

        @media(max-width: ${breakpoints.smp}){
            font-size: 10px;
        }
    }
`

const SeeMore = styled.span`
    display: inline-block;
    width: 100%;
    text-align: center;
    margin: 10px 0 0 0;

    a{
        font-size: 14px;
        font-weight: 600;
        text-decoration: underline;
        color: ${colors.primary};
        text-transform: uppercase;
    }
` 

const PlaylistName = styled.div`
    width: 100%;
    font-size: 1.75rem;
    font-weight: 600;
    font-style: normal;
    background: ${colors.primaryGradient};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid ${colors.gray};
    padding: 0 0 10px 0;

    img{
        height: 1.75rem;
        width: 1.75rem;
        margin: 0 0 0 5px;
    }

    @media(max-width: ${breakpoints.sml}){
        font-size: 1.5rem;
    }

    @media(max-width: ${breakpoints.sml}){
        font-size: 1.25rem;
    }
`

const Playlist = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    width: 100%;
    background: #fff;
    border-radius: ${metrics.borderRadius};
    padding: 10px 20px;
`

const Playlists = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
    justify-content: center;
    gap: 20px;
    margin: 40px 0 0 0;

    @media(max-width: ${metrics.maxWidthContainer}){
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media(max-width: ${breakpoints.xlg}){
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media(max-width: 700px){
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
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