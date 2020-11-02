import React from 'react'
import Modal from '../modal/Modal'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {Title as title, metrics, Button as button} from '../../../styles/style'

const NotPremium = () => {
    const styleModal = `display: flex; align-items: center;`

    const modalContent = (
        <WrapperContent>
            <Title>Desculpe por isso...</Title>
            <p>
                Gostaríamos muito de ter você por aqui, mas para fazer a mágica acontecer usamos um serviço do Spotify
                que só está disponível para usuários que tenham uma assinatura Premium.
            </p>
            <p>
                Mas não se preocupe, você ainda pode entrar usando uma outra conta.
            </p>
            <Link to="/logoff">
                <Button>Entrar com outra conta</Button>
            </Link>
        </WrapperContent>
    )

    return (
        <Modal
            content={modalContent}
            styleModal={styleModal}
        />
    )
}

export default NotPremium

const Button = styled(button)`
    margin: ${metrics.spacing4} 0 0 0;
    font-size: 14px;
    padding-top: 8px;
    padding-bottom: 8px;
`

const Title = styled(title)`
    width: 100%;
    font-size: 24px;
    line-height: 1;
    font-weight: bold;
    position: relative;
    text-align: left;
    color: #000;
`

const WrapperContent = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    position: relative;

    p{
        margin: ${metrics.spacing2} 0 0 0;
        &:first-of-type{
            margin: ${metrics.spacing4} 0 0 0;
        }
        color: #222;
        font-size: 16px;
        letter-spacing: 1.2px;
    }
`