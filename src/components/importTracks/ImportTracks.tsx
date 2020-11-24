import React, { useEffect } from 'react'
import styled from 'styled-components'
import useImportTracks from '../../common/hooks/useImportTracks'
import { Container, Page} from '../../styles/style'
import FilesManager from './FilesManager'
import FoundTracks from './FoundTracks/FoundTracks'

const ImportTracks = () => {
    const {actionFindTrack, foundTracks, status} = useImportTracks()

    useEffect(() => console.log(status),[status])
    useEffect(() => console.log(foundTracks),[foundTracks])

    return (
        <Page>
            <Container>
                <Main>
                    <FilesManager status={status} actionFindTrack={actionFindTrack}/>
                    <FoundTracks status={status} foundTracks={foundTracks}/>
                </Main>
            </Container>
        </Page>
    )
}

const Main = styled.main`
    height: 100%;
    width: 100%;
    position: relative;
`

export default ImportTracks