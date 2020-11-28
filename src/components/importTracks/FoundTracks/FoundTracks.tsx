import React, { useContext } from 'react'
import { Loader, XCircle } from 'react-feather'
import styled from 'styled-components'
import {StatusImport} from '../types'
import { Text } from '../../../styles/style'
import FoundTracksTable from './FoundTracksTable'
import ContextImportTracks from '../ContextImportTracks'

const FoundTracks = () => {
    const {statusImport} = useContext(ContextImportTracks)

    return(
        <Content statusImport={statusImport}>
            <Success>
                <FoundTracksTable/>
            </Success>
            <Loading>
                <Loader/>
                <Text>Só um momento, <br/> enquanto buscamos suas músicas.</Text>
            </Loading>
            <Error>
                <XCircle/>
                <Text>Não esperávamos por essa. <br/> Tivemos um problema ao importar suas músicas.</Text>
            </Error>
        </Content>
    )
}

export default FoundTracks

const show = `opacity: 1; user-select: initial; pointer-events: initial; position: relative;`
const hide = `opacity: 0; user-select: none; pointer-events: none; position: absolute;`

const styleStatus = `
    min-height: 50vh;
    width: 100%;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    transition: opacity .5s;
    top: 0;
    ${hide}

    svg{
        height: 55px;
        width: 55px;
    }

    ${Text}{
        text-align: center;
        line-height: 1.2;
    }
`

const Success = styled.div`
    transition: opacity .5s;
    max-width: 100%;
`

const Error = styled.div`
    ${styleStatus}
`

const Loading = styled.div`
    ${styleStatus}

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

const Content = styled.div<{statusImport: StatusImport}>`
    position: absolute;
    top: 0;
    width: 100%;
    max-width: 100%;
    opacity: 0;

    ${ ({statusImport: status}) => {
        if(status !== 'none')
            return show
        return hide
    }}

    ${Success}{
        ${ ({statusImport: status}) => {
            if(status === 'success')
                return show
            return hide
        }}
    }

    ${Error}{
        ${ ({statusImport: status}) => {
            if(status === 'error')
                return show
            return hide
        }}
    }

    ${Loading}{
        ${ ({statusImport: status}) => {
            if(status === 'loading')
                return show
            return hide
        }}
    }
`