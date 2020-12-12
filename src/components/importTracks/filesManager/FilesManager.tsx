import React, { useCallback, useContext, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { breakpoints, colors, metrics, Page as page, Text, Title } from '../../../styles/style'
import {Plus, Upload} from 'react-feather'
import { useDropzone } from 'react-dropzone'
import useFilesPreview from '../../../common/hooks/components/importTracks/useFilesPreview'
import { StatusImport, StatusPreview } from '../types'
import ListFiles from './ListFiles'
import ContextImportTracks from '../ContextImportTracks'
import { breakpoint } from '../style'

const FilesManager = () => {
    const {actionFindTrack,statusImport, actionFinishResetImportTracks} = useContext(ContextImportTracks)
    const {droppedFiles, filesPreview, removeFile, onDrop} = useFilesPreview({statusImport, actionFinishResetImportTracks})
    const {getRootProps,getInputProps} = useDropzone({accept: 'audio/*', onDrop, multiple: true})
    const [statusPreview, setStatusPreview] = useState<StatusPreview>('empty')
    const [displayNone, setDisplayNone] = useState(false)

    useEffect(() => {
        setStatusPreview(statusPreview => {
            if(filesPreview.length)
                return 'show'
            else if(statusPreview !== 'empty' && !filesPreview.length)
                return 'hide'
            return statusPreview
        })
    },[filesPreview])

    useEffect(() => {
        setTimeout(() => {
            if(statusImport !== 'none'){
                return setDisplayNone(true)
            }
            setDisplayNone(false)
        },500)
    },[statusImport])

    const findTrack = useCallback(() => {
        actionFindTrack(droppedFiles)
    },[droppedFiles, actionFindTrack])

    return(
        <SectionFilesManager displayNone={displayNone} statusImport={statusImport}>
            <Page>
                <Title>Importar músicas</Title>
                <Text>Importe suas músicas locais para o Spotify facilmente. Selecione ou arraste suas músicas para a área abaixo e iremos buscar automaticamente por elas na biblioteca do Spotify.</Text>
            </Page>
            <WrapperDropArea thereAreFiles={statusPreview === 'show'}>
                <Center thereAreFiles={statusPreview === 'show'}>
                    <DropArea thereAreFiles={statusPreview === 'show'} {...getRootProps()}>
                        <input {...getInputProps()}/>
                        <Upload/>
                        <Text>Solte aqui ou clique <br/> para selecionar <br/> suas músicas</Text>  
                        <span>
                            <Plus/>
                        </span>
                    </DropArea>
                    <ListFiles
                        filesPreview={filesPreview}
                        statusPreview={statusPreview}
                        removeFile={removeFile}
                        findTrack={findTrack}
                    />
                </Center>
            </WrapperDropArea>
        </SectionFilesManager>
    )
}

const DropArea = styled.div<{thereAreFiles: boolean}>`
    min-height: calc(var(--width-droparea));
    /* min-height: calc(var(--width-droparea) + 50px); */
    height: 100%;
    width: var(--width-droparea);
    max-width: 100%;
    background: #fff;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 1px solid rgba(0,0,0,0);
    padding: ${metrics.spacing5} 0;
    border-radius: ${metrics.borderRadius};
    box-shadow: 0px 4px 16px 16px #000000 16%;
    transition: border .25s, border-radius .25s;

    & > svg{
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

    span{
        opacity: 0;
        user-select: none;
        position: absolute;
        display: inline-flex;
        background: ${colors.primary};
        border-radius: 100%;
        height: 40px;
        width: 40px;
        padding: 10px;
        box-shadow: 0 3px 8px 0px rgba(0,0,0,0.16);

        svg{
            height: 100%;
            width: 100%;
            stroke-width: 2px;
            stroke: #fff;
        }
    }

    ${({thereAreFiles}) => {
        if(thereAreFiles)
            return css`
                @media(min-width: calc(${breakpoint} + 1px)){
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                    border-right-color: ${colors.gray};
                }
                @media(max-width: ${breakpoint}){
                    border-bottom-left-radius: 0;
                    border-bottom-right-radius: 0;
                    border-bottom-color: ${colors.gray};
                }
                @media(max-width: ${breakpoints.sml}){
                    border-radius: 0;
                }
            `
    }}

    @media(max-width: ${breakpoint}){
        min-height: inherit;
        height: auto;
        padding: ${metrics.spacing3} 0;
        transition: height .5s, width .5s;

        & > svg, ${Text}{
            transition: opacity .25s;
        }
        span{
            transition: opacity .25s;
        }

        & > svg{
            height: 65px;
            width: 65px;
        }

        ${Text}{
            font-size: 1rem;
        }

        ${({thereAreFiles}) => {
            if(thereAreFiles)
                return css`
                    & > svg, ${Text}{
                        opacity: 0;
                        position: absolute;
                        user-select: none;
                    }
                    span{
                        opacity: 1;
                        position: relative;
                        user-select: all;
                    }
                `
        }}
    }
`

const Center = styled.div<{thereAreFiles: boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 1 auto;
    width: 100%;
    position: relative;
    --width-droparea: 300px;

    @media(max-width: ${breakpoint}){
        flex-flow: column nowrap;
    }

    @media(max-width: ${breakpoints.sml}){
        ${({thereAreFiles}) => thereAreFiles ? '--width-droparea: 100%;' : ''}
    }
`

const WrapperDropArea = styled(page)<{thereAreFiles: boolean}>`
    flex: 1 1 auto;
    width: 100%;
    display: flex;
    margin: ${metrics.spacing4} 0;

    @media(max-width: ${breakpoints.sml}){
        ${({thereAreFiles}) => thereAreFiles ? css`
            margin-bottom: 0 !important;
            padding-left: 0;
            padding-right: 0;
        ` : ''}
    }
`

const Page = styled(page)`
    flex: 0 0 0;
`

const SectionFilesManager = styled.section<{statusImport: StatusImport, displayNone: boolean}>`
    display: flex;
    flex-flow: column nowrap;
    flex: 1 1 auto;
    opacity: 1;
    transition: opacity .5s;
    max-width: 100%;

    ${Title},
    & > ${Text}{
        width: 100%;
        text-align: left;
    }
    & > ${Text}{
        margin: ${metrics.spacing2} 0 0 0;
        @media(max-width: ${breakpoints.tbl}){
            font-size: 18px;
        }
    }

    ${ ({statusImport: status}) => {
        if(status !== 'none')
            return css`
                opacity: 0;
                user-select: none;
                pointer-events: none;
                position: absolute;
                top: 0;
                left: 0;
            `
        return css`
            opacity: 1;
            user-select: initial;
            pointer-events: initial;
            position: relative;
        `
    }}

    ${({displayNone}) => displayNone ? 'display: none;' : ''}
`

export default FilesManager