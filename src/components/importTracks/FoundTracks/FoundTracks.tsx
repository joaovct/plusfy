import React from 'react'
import styled from 'styled-components'
import { FoundTrack } from '../../../common/helpers/helperImportTracks'
import {Status} from '../../../common/hooks/useImportTracks'
import { Button, colors, metrics, PlaylistTable, PlaylistTableRow as playlisttablerow, Title, Text } from '../../../styles/style'
import { Clock, Play, Loader, XCircle } from 'react-feather'
import emptyAlbumPhoto from '../../../assets/empty-playlist-photo.svg'
import currentState from '../../../redux/reducers/currentStateReducer'
import { useSelector } from 'react-redux'
import { IStore } from '../../../redux/store/types'
import { ICurrentState } from '../../../redux/store/currentState/types'
import { formatArtistName, formatDuration } from '../../../common/helpers/helperPlaylistTable'


interface FCFoundTracks{
    status: Status
    foundTracks: FoundTrack[]
}

const FoundTracks: React.FC<FCFoundTracks> = ({status, foundTracks}) => {
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)

    return(
        <ComponentContent status={status}>
            <Loading status={status}>
                <Loader/>
                <Text>Apenas aguarde um pouco, <br/> enquanto buscamos suas músicas</Text>
            </Loading>
            <Error status={status}>
                <XCircle/>
                <Text>Não esperávamos por essa. <br/> Tivemos um problema ao importar suas músicas.</Text>
            </Error>
            <Success status={status}>
                <TableBackground>
                    <PlaylistTable qntColumns={7}>
                        <PlaylistTableRow>
                            <div>#</div>
                            <div>Título</div>
                            <div>Artista</div>
                            <div>Álbum</div>
                            <div>Arquivo</div>
                            <div><Clock/></div>
                            <div></div>
                        </PlaylistTableRow>
                        {
                            foundTracks.map( (track, i) => {
                                if(track.track)
                                    return(
                                        <PlaylistTableRow key={`foundtrack-${track.track.uri}-${i}`} uri={track.track.uri} playingUri={currentState?.item?.uri}>
                                            <div>
                                                <span>{i + 1}</span>
                                                <Play/>
                                            </div>
                                            <div>
                                                <img src={track.track.album.images[0]?.url || emptyAlbumPhoto} alt={`Album ${track.track}`} />
                                                <span>{track.track.name}</span>
                                            </div>
                                            <div>
                                                {formatArtistName(track.track)}
                                            </div>
                                            <div>
                                                {track.track.album.name}
                                            </div>
                                            <div>
                                                {track.file.fieldname}
                                            </div>
                                            <div>
                                                {formatDuration(track.track.duration_ms)}
                                            </div>
                                            <div>
                                                <Button>Add</Button>    
                                            </div>
                                        </PlaylistTableRow>
                                    )
                                return <></>
                            }) 
                        }
                    </PlaylistTable>
                </TableBackground>
            </Success>

        </ComponentContent>
    )
}

export default FoundTracks

const PlaylistTableRow = styled(playlisttablerow)`
    div{
        &:nth-child(2){
            flex-grow: 5;
        }
        &:nth-child(6){
            max-width: 75px;
        }
        &:nth-child(7) ${Button}{
            display: inline-block;
            min-width: inherit;
            font-size: 14px;
            padding: 6px 32px;
            margin: auto;
        }
    }
`

const TableBackground = styled.div`
    background: ${colors.darkerBackground};
    border-radius: ${metrics.borderRadius};
    margin: ${metrics.spacing4} 0 0 0;
    position: relative;
`

const Success = styled.div<{status: Status}>`
    transition: opacity .5s;
    
    ${ ({status}) => {
        if(status === 'success')
            return `
                opacity: 1;
                user-select: initial;
                pointer-events: initial;
            `
        return `
            opacity: 0;
            user-select: none;
            pointer-events: none;
        `
    }}
`

const MockupStatus = styled.div<{status: Status}>`
    min-height: 50vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    position: absolute;
    opacity: 0;
    user-select: none;
    pointer-events: none;
    transition: opacity .5s;

    svg{
        height: 55px;
        width: 55px;
    }

    ${Text}{
        text-align: center;
        line-height: 1.2;
    }
`

const Loading = styled(MockupStatus)`
    svg{
        animation: rotation 3s infinite linear;

        @keyframes rotation{
            from{
                transform: rotate(0deg);
            }
            to{
                transform: rotate(359deg);
            }
        }
    }

    ${ ({status}) => {
        if(status === 'loading')
            return `
                opacity: 1;
                user-select: initial;
                pointer-events: initial;
            `
        return `
            opacity: 0;
            user-select: none;
            pointer-events: none;
        `
    }}
`

const Error = styled(MockupStatus)`
    ${ ({status}) => {
        if(status === 'error')
            return `
                opacity: 1;
                user-select: initial;
                pointer-events: initial;
            `
        return `
            opacity: 0;
            user-select: none;
            pointer-events: none;
        `
    }}
`

const ComponentContent = styled.div<{status: Status}>`
    position: absolute;
    top: 0;
    width: 100%;
    max-width: 100%;
    opacity: 0;

    ${ ({status}) => {
        if(status !== 'none')
            return `
                opacity: 1;
                user-select: initial;
                pointer-events: initial;
            `
        return `
            opacity: 0;
            user-select: none;
            pointer-events: none;
        `
    }}
`