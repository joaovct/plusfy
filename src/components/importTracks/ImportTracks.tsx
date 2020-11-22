import React from 'react'
import styled from 'styled-components'
import { Container, Page, Title, Text, metrics} from '../../styles/style'
import FilesManager from './FilesManager'

const ImportTracks = () => {
    return (
        <Page>
            <Container>
                <Main>
                    <Title>Importar músicas</Title>
                    <Text>Importe suas músicas locais para o Spotify facilmente. Selecione ou arraste suas músicas para a área abaixo e iremos buscar automaticamente por elas na biblioteca do Spotify.</Text>
                    <FilesManager/>
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