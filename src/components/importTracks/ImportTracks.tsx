import React from 'react'
import styled from 'styled-components'
import useImportTracks from '../../common/hooks/components/importTracks/useImportTracks'
import { breakpoints, Page as page } from '../../styles/style'
import FoundTracks from './FoundTracks/FoundTracks'
import FilesManager from './filesManager/FilesManager'
import ContextImportTracks from './ContextImportTracks'

const ImportTracks = () => {
    const importTracksHook = useImportTracks()

    return (
        <ContextImportTracks.Provider value={{...importTracksHook}}>
            <Page>
                <Main>
                    <FilesManager />
                    <FoundTracks/>
                </Main>
            </Page>
        </ContextImportTracks.Provider>
    )
}

const Main = styled.main`
    width: 100%;
    position: relative;
    flex: 1 1 auto;
    display: flex;
    flex-flow: column nowrap;
`

const Page = styled(page)`
    display: flex;
    flex-flow: column nowrap;

    @media(max-width: ${breakpoints.sml}){
        padding-left: 0;
        padding-right: 0;
    }
`

export default ImportTracks