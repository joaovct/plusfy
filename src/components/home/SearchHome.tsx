import React, { useState } from 'react'
import {Search} from 'react-feather'
import {Input as input, metrics} from '../../styles/style'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const SearchHome = () => {
    const [query, setQuery] = useState('')
    const history = useHistory()

    const handleSearch = () => {
        if(query)
            history.push(`/search/${query}`)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key.toLowerCase() === 'enter' || e.keyCode === 13)
            handleSearch()
    }

    return(
        <Label>
            <Search onClick={handleSearch}/>
            <Input
                onKeyDown={handleKeyDown}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Procurar por músicas, albuns, playlists..."
            />
        </Label>
    )
}

const Input = styled(input)`
    padding-left: calc(${metrics.spacing5} + 16px);
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
        color: #000;
        *{
            color: #000;
        }
    }
`

export default SearchHome