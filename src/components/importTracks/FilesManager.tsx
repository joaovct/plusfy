import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { colors, metrics, Text } from '../../styles/style'
import {Upload, Trash} from 'react-feather'
import { useDropzone } from 'react-dropzone'
import { compareTwoFiles, getTrackFileMetaData, preventRepeatedFile } from '../../common/helpers/helperImportTracks'
import emptyAlbumPhoto from '../../assets/empty-playlist-photo.svg'

type FilePreview = {
    name: string
    size: number
    type: string
    imgURL?: string
} | null


const FilesManager = () => {
    const [droppedFiles, setDroppedFiles] = useState<File[]>([])
    const [filesPreview, setFilesPreview] = useState<FilePreview[]>()

    const getMetaData = (droppedFile: File) => new Promise<FilePreview>(resolve =>
        getTrackFileMetaData(droppedFile, (err, metadata) => {
            if(err){
                console.error(metadata)
                return resolve(null)
            }
            let imgURL = undefined
            if(metadata.picture[0]){
                const blob = new Blob([metadata.picture[0].data], {type: `image/${metadata.picture[0].format}`})
                imgURL = window.URL.createObjectURL(blob)
            }
            resolve({name: droppedFile.name, type: droppedFile.type, size: droppedFile.size, imgURL})
        })
    )

    const onDrop = useCallback((newFiles: File[]) => {
        const newDroppedFiles = preventRepeatedFile(droppedFiles, newFiles)
        setDroppedFiles(newDroppedFiles)
        Promise.all(newDroppedFiles.map(getMetaData)).then(setFilesPreview)
    },[droppedFiles])

    const {getRootProps,getInputProps} = useDropzone({accept: 'audio/*', onDrop, multiple: true})

    const removeFile = useCallback((filePreview: FilePreview) => {
        if(filePreview)
            setDroppedFiles(droppedFiles => droppedFiles.filter(droppedFile => !compareTwoFiles(droppedFile, filePreview)))
    },[])

    useEffect(() => {
        Promise.all(droppedFiles.map(getMetaData)).then(setFilesPreview)
    },[droppedFiles])

    return(
        <Flex>
            <Content>
                <DropArea {...getRootProps()} showBorder={droppedFiles.length && filesPreview?.length ? true : false}>
                    <input {...getInputProps()}/>
                    <Upload/>
                    <Text>Solte aqui ou clique <br/> para selecionar <br/> suas músicas</Text>  
                </DropArea>
                <ListFiles show={droppedFiles.length && filesPreview?.length ? true : false}>
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
                    </ListFilesWrapper>
                </ListFiles>
            </Content>
        </Flex>
    )
}


const ListFilesContent = styled.ul`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    overflow-y: scroll;

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

const ListFiles = styled.div<{show: boolean}>`
    width: 0;
    height: 100%;
    transition: width .5s;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    --width-content: 350px;

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

    ${props => props.show ? `animation: growUp 1s forwards;` : 'animation: shrink 1s forwards;'}
`

const DropArea = styled.div<{showBorder: boolean}>`
    height: 100%;
    width: 250px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-right: 1px solid rgba(0,0,0,0);
    transition: border .5s;
    ${ props => props.showBorder ? `border-color: ${colors.gray};` : ''}
    padding: ${metrics.spacing4};


    svg{
        border-color: inherit;
        height: 80px;
        width: 80px;
        *{
            stroke-width: 2px;
            color: ${colors.primary};
        }
    }
    ${Text}{
        color: ${colors.darkerGray};
        font-weight: 500;
        font-size: 1.2rem;
        text-align: center;
        margin: 10px 0 0 0;
        user-select: none;
    }  
`

const Content = styled.div`
    height: 270px;
    width: auto;
    display: inline-flex;
    position: relative;
    background: #fff;
    border-radius: ${metrics.borderRadius};
    box-shadow: 0px 4px 16px 16px #000000 16%;
`

const Flex = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: ${metrics.spacing5} auto 0 auto;
`

export default FilesManager