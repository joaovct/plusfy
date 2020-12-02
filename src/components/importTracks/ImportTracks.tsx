import React from 'react'
import styled from 'styled-components'
import useImportTracks from '../../common/hooks/components/useImportTracks'
import { Container, Page} from '../../styles/style'
import FoundTracks from './FoundTracks/FoundTracks'
import FilesManager from './filesManager/FilesManager'
import ContextImportTracks from './ContextImportTracks'

const ImportTracks = () => {
    const importTracksHook = useImportTracks()

    return (
        <ContextImportTracks.Provider value={{...importTracksHook}}>
            <Page>
                <Container>
                    <Main>
                        <FilesManager />
                        <FoundTracks/>
                    </Main>
                </Container>
            </Page>
        </ContextImportTracks.Provider>
    )
}

const Main = styled.main`
    height: 100%;
    width: 100%;
    position: relative;
`

export default ImportTracks