import React, { useCallback, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { colors, metrics, Text, Title } from '../../../styles/style'
import {Upload} from 'react-feather'
import { useDropzone } from 'react-dropzone'
import useFilesPreview from '../../../common/hooks/components/importTracks/useFilesPreview'
import { StatusImport, StatusPreview } from '../types'
import ListFiles from './ListFiles'
import ContextImportTracks from '../ContextImportTracks'

const FilesManager = () => {
    const {actionFindTrack, statusImport, actionFinishResetImportTracks} = useContext(ContextImportTracks)
    const {droppedFiles, filesPreview, removeFile, onDrop} = useFilesPreview({statusImport, actionFinishResetImportTracks})
    const {getRootProps,getInputProps} = useDropzone({accept: 'audio/*', onDrop, multiple: true})
    const [statusPreview, setStatusPreview] = useState<StatusPreview>('empty')

    useEffect(() => {
        setStatusPreview(previewStatus => {
            if(filesPreview.length)
                return 'show'
            else if(previewStatus !== 'empty' && !filesPreview.length)
                return 'hide'
            return previewStatus
        })
    },[filesPreview])

    const findTrack = useCallback(() => {
        actionFindTrack(droppedFiles)
    },[droppedFiles, actionFindTrack])

    return(
        <ComponentContent statusImport={statusImport}>
            <Title>Importar músicas</Title>
            <Text>Importe suas músicas locais para o Spotify facilmente. Selecione ou arraste suas músicas para a área abaixo e iremos buscar automaticamente por elas na biblioteca do Spotify.</Text>
            <Flex>
                <MainContent>
                    <DropArea {...getRootProps()} showBorder={statusPreview === 'show' ? true : false}>
                        <input {...getInputProps()}/>
                        <Upload/>
                        <Text>Solte aqui ou clique <br/> para selecionar <br/> suas músicas</Text>  
                    </DropArea>
                    <ListFiles filesPreview={filesPreview} statusPreview={statusPreview} removeFile={removeFile} findTrack={findTrack}/>
                </MainContent>
            </Flex>
        </ComponentContent>
    )
}


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

const MainContent = styled.div`
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

const ComponentContent = styled.div<{statusImport: StatusImport}>`
    opacity: 1;
    transition: opacity .5s;

    ${Title},
    & > ${Text}{
        width: 100%;
        text-align: left;
    }
    & > ${Text}{
        margin: ${metrics.spacing2} 0 0 0;
    }

    ${ ({statusImport: status}) => {
        if(status !== 'none')
            return `
                opacity: 0;
                user-select: none;
                pointer-events: none;
                position: absolute;
            `
        return `
            opacity: 1;
            user-select: initial;
            pointer-events: initial;
            position: relative;
        `
    }}
`

export default FilesManager