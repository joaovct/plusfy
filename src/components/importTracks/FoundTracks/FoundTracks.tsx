import React, { useContext, useEffect, useState } from 'react'
import { Loader, XCircle } from 'react-feather'
import styled from 'styled-components'
import {show, hide} from '../style'
import {StatusImport} from '../types'
import { breakpoints, Button, Container as container, metrics, Text } from '../../../styles/style'
import FoundTracksTable from './FoundTracksTable'
import ContextImportTracks from '../ContextImportTracks'

const FoundTracks = () => {
    const {statusImport, actionStartResetImportTracks} = useContext(ContextImportTracks)
    const [displayNone, setDisplayNone] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            if(statusImport === 'none'){
                return setDisplayNone(true)
            }
            setDisplayNone(false)
        },500)
    },[statusImport])

    return(
        <Container displayNone={displayNone}>
            <Content statusImport={statusImport}>
                <StatusSuccess>
                    <FoundTracksTable/>
                </StatusSuccess>
                <StatusLoading>
                    <Loader/>
                    <Text>Só um momento, <br/> enquanto buscamos suas músicas.</Text>
                </StatusLoading>
                <StatusError>
                    <XCircle/>
                    <Text>Não esperávamos por essa. <br/> Tivemos um problema ao importar suas músicas.</Text>
                    <Button
                        typeButton="secondary"
                        onClick={actionStartResetImportTracks}
                    >
                        Voltar e tentar novamente
                    </Button>
                </StatusError>
            </Content>
        </Container>
    )
}

export default FoundTracks

const StatusSuccess = styled.div`
    flex: 1 1 auto;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    transition: opaacity .5s;
`

const Status = styled.div`
    flex: 1 1 auto;
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    transition: opaacity .5s;

    @media(max-width: ${breakpoints.sml}){
        padding: 0 ${metrics.spacing3};
        border-radius: 0;
    }

    svg{
        height: 55px;
        width: 55px;
    }

    ${Text}{
        text-align: center;
        line-height: 1.2;

        @media(max-width: ${breakpoints.tbp}){
            font-size: 18px;
        }

        @media(max-width: ${breakpoints.sml}){
            font-size: 16px;
        }
    }
`

const StatusLoading = styled(Status)`
    svg{
        animation: rotation 3s infinite linear;

        @keyframes rotation{
            from{
                transform: rotate(0deg);
            }
            to{
                transform: rotate(359deg);
            }
        }
    }
`

const StatusError = styled(Status)`
    ${Button}{
        padding-top: 12px;
        padding-bottom: 12px;
        font-size: 13px;
        margin: ${metrics.spacing4} 0 0 0;
    }
`

const Content = styled.div<{statusImport: StatusImport}>`
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    flex: 1 1 auto;

    ${({statusImport: status}) => {
        if(status !== 'none')
            return show
        return hide
    }}

    ${StatusSuccess}{
        ${ ({statusImport: status}) => {
            if(status === 'success')
                return show
            return hide
        }}
    }

    ${StatusError}{
        ${ ({statusImport: status}) => {
            if(status === 'error')
                return show
            return hide
        }}
    }

    ${StatusLoading}{
        ${ ({statusImport: status}) => {
            if(status === 'loading')
                return show
            return hide
        }}
    }

`

const Container = styled(container)<{displayNone: boolean}>`
    display: flex;
    flex-flow: column nowrap;
    flex: 1 1 auto;

    ${({displayNone}) => displayNone ? 'display: none;' : ''}
`