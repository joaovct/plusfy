import React from 'react'
import {Search} from 'react-feather'
import {Input as input, metrics} from '../../styles/style'
import styled from 'styled-components'

const SearchHome = () => {

    return(
        <Label>
            <Search/>
            <Input placeholder="Procurar por músicas, artista, playlist..."/>
        </Label>
    )
}

const Input = styled(input)`
    padding-left: calc(40px + 16px);
`

const Label = styled.label`
    padding-top: ${metrics.spacing4};
    position: relative;
    display: flex;
    align-items: center;

    svg{
        position: absolute;
        height: 24px;
        width: 24px;
        left: calc(40px - 16px);
    }
`

export default SearchHome