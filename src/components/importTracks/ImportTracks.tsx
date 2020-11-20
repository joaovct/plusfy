import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Container, Page, Title, Text, metrics } from '../../styles/style'
import {Upload} from 'react-feather'
import {useDropzone} from 'react-dropzone'
import useImportTracks from '../../common/hooks/useImportTracks'

const ImportTracks = () => {
    const {foundTracks, status, actionFindTrack} = useImportTracks()
    const {getRootProps,getInputProps} = useDropzone({accept: 'audio/*', onDrop: actionFindTrack, multiple: true})

    useEffect(() => {
        console.log(foundTracks)
    },[foundTracks])
    
    useEffect(() => {
        console.log(status)
    },[status])

    return (
        <Page>
            <Container>
                <Main>
                    <Title>Importar músicas</Title>
                    <Text>Importe suas músicas locais para o Spotify facilmente. Selecione ou arraste suas músicas para a área abaixo e iremos buscar automaticamente por elas na biblioteca do Spotify.</Text>
                    <DropArea {...getRootProps()}>
                        <input {...getInputProps()}/>
                        <Upload/>
                        <Text>Solte suas músicas aqui ou clique para selecioná-las.</Text>
                    </DropArea>
                </Main>
            </Container>
        </Page>
    )
}


const DropArea = styled.div`
    display: block;
    width: 100%;
    max-width: 600px;
    height: 325px;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='white' stroke-width='4' stroke-dasharray='30%2c 20' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
    border-radius: 12px;
    margin: ${metrics.spacing5} auto 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    cursor: pointer;

    input{
        display: none;
    }

    svg{
        height: 100px;
        width: 100px;
        *{
            stroke-width: 1px;
        }
    }
    ${Text}{
        opacity: .8;
        font-size: 18px;
    }
`

const Main = styled.main`
    height: 100%;
    width: 100%;
`

export default ImportTracks