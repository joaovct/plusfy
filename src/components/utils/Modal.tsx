import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { metrics, colors } from '../../styles/style'

interface IModal{
    content: JSX.Element
    styleModal?: string
}

const Modal: FunctionComponent<IModal> = props => {
    return(
        <Fullpage>
            <WrapperModal styleModal={props.styleModal || ''}>
                {props.content}
            </WrapperModal>
        </Fullpage>
    ) 
}

export default Modal

const WrapperModal = styled.main< {styleModal: string} >`
    min-height: 100px;
    min-width: 300px;
    max-width: 600px;
    border-radius: 14px;
    color: #000;
    background: #fff;
    border-color: ${colors.border};
    box-shadow: 0 12px 24px 12px rgba(0,0,0, .16);
    padding: ${metrics.spacing4};
    ${ (props) => props.styleModal}
`

const Fullpage = styled.div`
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(2px);
    animation: fadeIn .5s;
    animation-fill-mode: forwards;

    @keyframes fadeIn{
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }
`