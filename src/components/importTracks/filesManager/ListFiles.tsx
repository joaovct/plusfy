import React from 'react'
import { Trash } from 'react-feather'
import styled from 'styled-components'
import { RemoveFile } from '../../../common/hooks/useFilesPreview'
import { Button, colors, metrics, Text } from '../../../styles/style'
import { StatusPreview } from '../types'
import { FilePreview } from '../../../common/hooks/useFilesPreview'
import emptyAlbumPhoto from '../../../assets/empty-playlist-photo.svg'

interface ListFilesProps{
    filesPreview: FilePreview[]
    removeFile: RemoveFile
    statusPreview: StatusPreview
    findTrack: () => void
}

const ListFiles: React.FC<ListFilesProps> = ({filesPreview, removeFile, statusPreview, findTrack}) => {
    return(
        <ListFilesStyled statusPreview={statusPreview}>
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
        </ListFilesStyled>
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

    ${Text}{
        color: #000;
    }
`

const ListFilesStyled = styled.div<{statusPreview: StatusPreview}>`
    width: 0;
    height: 100%;
    transition: width .5s;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    --width-content: 350px;
    --height-wrapperbutton: 60px;

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

    ${({statusPreview}) => {
        if(statusPreview === 'show')
            return 'animation: growUp 1s forwards;'
        else if(statusPreview === 'hide')
            return 'animation: shrink 1s forwards;'
    }}
`