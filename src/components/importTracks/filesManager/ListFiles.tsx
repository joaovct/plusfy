import React from 'react'
import { Trash } from 'react-feather'
import styled, { css } from 'styled-components'
import { RemoveFile } from '../../../common/hooks/components/importTracks/useFilesPreview'
import { breakpoints, Button, colors, metrics, Text } from '../../../styles/style'
import { StatusPreview } from '../types'
import { FilePreview } from '../../../common/hooks/components/importTracks/useFilesPreview'
import emptyAlbumPhoto from '../../../assets/empty-playlist-photo.svg'
import { breakpoint } from '../style'

interface ListFilesProps{
    filesPreview: FilePreview[]
    removeFile: RemoveFile
    statusPreview: StatusPreview
    findTrack: () => void
}

const ListFiles: React.FC<ListFilesProps> = ({filesPreview, removeFile, statusPreview, findTrack}) => {
    return(
        <ListFilesAside statusPreview={statusPreview}>
            <ListFilesWrapper>
                <ListFilesContent>
                    {
                        filesPreview?.map((filePreview,i) => {
                            if(filePreview)
                                return(
                                    <li key={`filepreview${filePreview.name}${filePreview.type}${filePreview.size}${i}`}>
                                        <img src={filePreview?.imgURL || emptyAlbumPhoto} alt="Album"/>
                                        <span>
                                            <strong>{filePreview?.name}</strong>
                                            <small>{(filePreview?.size / 1024 / 1024).toFixed(2)} mb</small>
                                        </span>
                                        <Trash onClick={() => removeFile(filePreview)}/>
                                    </li>
                                )
                        })
                    }
                </ListFilesContent>
                <WrapperSearchSpotify>
                    <Button onClick={findTrack}>Buscar no spotify</Button>
                </WrapperSearchSpotify>
            </ListFilesWrapper>
        </ListFilesAside>
    )
}

export default ListFiles

const WrapperSearchSpotify = styled.div`
    height: var(--height-wrapperbutton);
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.01);
    backdrop-filter: blur(4px);
    padding: 0 ${metrics.spacing2};
    border-bottom-right-radius: ${metrics.borderRadius};

    ${Button}{
        width: auto;
        min-width: inherit;
        font-size: 14px;
        padding: 8px 24px;
    }
`

const ListFilesContent = styled.ul`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    overflow-y: scroll;
    padding: 0 0 var(--height-wrapperbutton) 0;

    &::-webkit-scrollbar {
        width: 0px;
        background: transparent;
    }

    li{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: ${metrics.spacing2} ${metrics.spacing3};
        border-bottom: 1px solid ${colors.gray};

        &:last-child{
            border-bottom: none;
        }

        img{
            height: 40px;
            width: 40px;
            user-select: none;
        }

        span{
            display: flex;
            flex-flow: column nowrap;
            margin: 0 0 0 ${metrics.spacing2};
            
            strong{
                font-size: 1rem;
                font-weight: 600;
                color: ${colors.darkerGray};
            }
            small{
                font-weight: 500;
                color: ${colors.gray};
            }
        }

        svg{
            height: 20px;
            width: 20px;
            margin: 0 0 0 auto;
            cursor: pointer;
            user-select: none;
        }

        *{
            color: #000;
        }
    }
`

const ListFilesWrapper = styled.div`
    height: 100%;
    width: var(--width-content); 
    position: absolute;
    right: 0;
    flex: 1 1 auto;

    ${Text}{
        color: #000;
    }

    @media(max-width: ${breakpoint}){
        position: relative;
    }
`

const ListFilesAside = styled.div<{statusPreview: StatusPreview}>`
    max-width: 100%;
    --width-content: calc(var(--width-droparea) + 50px);
    width: 0;
    height: 100%;
    position: relative;
    transition: height .5s, width .5s, opacity .25s;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    position: relative;
    overflow: hidden;
    --width-content: 350px;
    --height-wrapperbutton: 60px;
    background: #fff;
    border-top-right-radius: ${metrics.borderRadius};
    border-bottom-right-radius: ${metrics.borderRadius};
    opacity: 0;

    @media(min-width: calc(${breakpoint} + 1px)){
        min-height: var(--width-droparea);

        @keyframes growUp{
            from{
                width: 0;
            }
            to{
                width: var(--width-content);
            }
        }
        @keyframes shrink{
            from{
                width: var(--width-content);
            }
            to{
                width: 0;
            }
        }
    }

    @media(max-width: ${breakpoint}){
        width: var(--width-content);
        height: 0;
        --width-content: var(--width-droparea);
        border-radius: ${metrics.borderRadius};
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        flex: 1 1 auto;

        @keyframes growUp{
            from{
                height: 0;
            }
            to{
                height: 100%;
            }
        }
        @keyframes shrink{
            from{
                height: 100%;
            }
            to{
                height: 0;
            }
        }
    }

    @media(max-width: ${breakpoints.sml}){
        border-radius: 0;
    }

    ${({statusPreview}) => {
        if(statusPreview === 'show')
            return css`
                animation: growUp 1s forwards;
                opacity: 1;
            `
        else if(statusPreview === 'hide')
            return css`
                animation: shrink 1s forwards;
                opacity: 0;
            `
    }}
`