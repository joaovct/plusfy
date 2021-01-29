import React, { memo, useState } from 'react'
import { breakpoints, Button as button, colors, metrics, PlaylistTableRow, PlaylistTableRowProps } from '../../../styles/style'
import styled, { css } from 'styled-components'
import { Mood } from '../types'
import { getMoodIcon, getMoodTitle } from '../../../common/helpers/helperMood'
import { Track } from '../../../common/api/webapi/types'
import ListTracks from '../../common/listTracks/ListTracks'
import useAddToPlaylist from '../../../common/hooks/components/addPlaylist/useAddToPlaylist'
import useAlert from '../../../common/hooks/components/alert/useAlert'

interface Props{
    mood: Mood
    tracks: Track[]
    handlePlaylistUpdate: () => void
}

const MoodPlaylist: React.FC<Props> = ({mood, tracks, handlePlaylistUpdate}) => {
    const [seeMore, setSeeMore] = useState(false)
    const addPlaylist = useAddToPlaylist()
    const createAlert = useAlert()

    const toggleSeeMore = () => {
        setSeeMore(current => !current)
        setTimeout(handlePlaylistUpdate,100)
    }

    const clickSavePlaylist = () => {
        const uris = tracks.map(track => track?.uri || '').filter(uri => uri ? true : false)
        addPlaylist('create-playlist', uris, () => {
            createAlert('normal', 'Playlist salva 🥳')
        })
    }

    return(
        <Playlist>
                <PlaylistName>
                    {getMoodTitle(mood)}
                    <img src={getMoodIcon(mood)} alt={`${mood} playlist`}/>
                </PlaylistName>
                <ListTracks
                    tracks={!seeMore ? tracks.slice(0, 5) : tracks}
                    showHeader={false}
                    viewMode="simplified"
                    additionalCSS={listTracksCSS}
                />
                {
                    tracks.length > 5 ?
                    <SeeMore>
                        <button onClick={toggleSeeMore}>
                            {
                                !seeMore ? "Ver tudo" : "Mostrar menos"
                            }
                        </button>
                    </SeeMore>
                    : <></>
                }
                <Button onClick={clickSavePlaylist}>Salvar Playlist</Button>
            </Playlist>
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

    button{
        font-size: 14px;
        font-weight: 600;
        text-decoration: underline;
        color: ${colors.primary};
        text-transform: uppercase;
        cursor: pointer;
    }
` 

const PlaylistName = styled.div`
    width: 100%;
    font-size: 1.75rem;
    font-weight: 600;
    font-style: normal;
    color: ${colors.secondary};
    background: ${colors.primaryGradient};
    background-size: 100%;
    background-repeat: repeat;
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-text-fill-color: transparent;
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
    display: inline-flex;
    flex-flow: column nowrap;
    align-items: center;
    width: 100%;
    background: #fff;
    border-radius: ${metrics.borderRadius};
    padding: 10px 20px;
    margin: var(--gap) 0 0 0;
`

export default memo(MoodPlaylist)