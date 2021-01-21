import styled from 'styled-components'
import { Container as container, metrics } from '../../styles/style'

export const Container = styled(container)<{css: string}>`
    flex: 1 1 0;
    display: flex;
    flex-flow: column nowrap;
    top: 0;

    @media(max-width: ${metrics.maxWidthContainer}){
        &:nth-child(n+1){
            max-width: calc( 100vw - var(--spacingSidesPage) * 2 );
        }
    }

    ${({css}) => {
        return css
    }}

    @keyframes fadeOut{
        from{
            opacity: 1;
        }
        to{
            opacity: 0;
        }
    }

    @keyframes fadeIn{
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }
`