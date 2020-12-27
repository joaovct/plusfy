import React, { useState } from 'react'
import styled from 'styled-components'
import {ChevronDown as Close, MoreVertical} from 'react-feather'
import { Playlist } from '../../../../../common/api/webapi/types'
import { Dropdown } from '../../../../../styles/style'

interface Props{
    playlist: Playlist | undefined
    closeModal: () => void
}

const NowPlayingModalHeader: React.FC<Props> = ({playlist, closeModal}) => {
    const [showOptions, setShowOptions] = useState(false)

    return(
        <HeaderModal>
            <Close onClick={closeModal}/>
            <strong>{playlist?.name}</strong>
            <WrapperDropdown>
                <button onClick={() => setShowOptions(old => !old)}>
                    <MoreVertical/>
                </button>
                <Dropdown show={showOptions}>
                    <li>
                        <span>Teste</span>
                    </li>
                    <li>
                        <span>Teste</span>
                    </li>
                    <li>
                        <span>Teste</span>
                    </li>
                </Dropdown>
            </WrapperDropdown>
        </HeaderModal>
    )
}

export default NowPlayingModalHeader

const WrapperDropdown = styled.div`
    position: relative; 

    svg{
        height: 25px;
        width: 25px;
        cursor: pointer
    }

    ${Dropdown}{
        top: inherit;
        left: inherit;
        bottom: inherit;
        right: 0;
    }
`

const HeaderModal = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 auto 0;

    & > svg{
        height: 35px;
        width: 35px;
    }

    strong{
        font-size: 18px;
        font-weight: 500;
    }
`