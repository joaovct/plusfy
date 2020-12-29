import styled from 'styled-components'
import { metrics, Title } from '../../styles/style'

export const WrapperListItens = styled.div`
    margin: ${metrics.spacing3} 0 0 0;
`

export const Content = styled.div`
    padding: 0 0 ${metrics.spacing2} 0;

    ${Title}{
        font-size: 30px;
    }
`