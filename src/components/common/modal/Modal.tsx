import React from 'react'
import styled, { FlattenSimpleInterpolation } from 'styled-components'
import { metrics, colors } from '../../../styles/style'

type css = FlattenSimpleInterpolation | string

interface Props{
    cssModal?: css
    cssPage?: css
}

const Modal: React.FC<Props> = ({cssModal, cssPage, children}) => {
    return(
        <Fullpage cssPage={cssPage}>
            <StyledModal cssModal={cssModal}>
                {children}
            </StyledModal>
        </Fullpage>
    ) 
}

export default Modal

export const StyledModal = styled.main< {cssModal?: css} >`
    min-height: 100px;
    min-width: 300px;
    max-width: 600px;
    border-radius: 14px;
    color: #000;
    background: #fff;
    border-color: ${colors.border};
    box-shadow: 0 12px 24px 12px rgba(0,0,0, .16);
    padding: ${metrics.spacing4};
    ${({cssModal}) => {
        if(cssModal)
            return cssModal
    }}
`

export const Fullpage = styled.div< {cssPage?: css} >`
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
    ${({cssPage}) => {
        if(cssPage)
            return cssPage
    }}

    @keyframes fadeIn{
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }

    @keyframes fadeOut{
        from{
            opacity: 1;
        }
        to{
            opacity: 0;
        }
    }
`