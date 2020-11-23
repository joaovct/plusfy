import React, { useEffect } from 'react'
import styled from 'styled-components'
import useImportTracks from '../../common/hooks/useImportTracks'
import { Container, Page, Title, Text, metrics} from '../../styles/style'
import FilesManager from './FilesManager'

const ImportTracks = () => {
    const {actionFindTrack, foundTracks, status} = useImportTracks()

    useEffect(() => console.log(status),[status])

    useEffect(() => console.log(foundTracks),[foundTracks])

    return (
        <Page>
            <Container>
                <Main>
                    <Title>Importar músicas</Title>
                    <Text>Importe suas músicas locais para o Spotify facilmente. Selecione ou arraste suas músicas para a área abaixo e iremos buscar automaticamente por elas na biblioteca do Spotify.</Text>
                    <FilesManager actionFindTrack={actionFindTrack}/>
                </Main>
            </Container>
        </Page>
    )
}

const Main = styled.main`
    height: 100%;
    width: 100%;
    
    ${Title},
    & > ${Text}{
        width: 100%;
        text-align: left;
    }
    & > ${Text}{
        margin: ${metrics.spacing2} 0 0 0;
    }
`

export default ImportTracks