import React, { useState } from 'react'
import { Page, Container, Input as input, metrics} from '../../styles/style'
import {Search as SearchIcon} from 'react-feather'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import SearchTracks from './searchTracks/SearchTracks'

let timeout = 0

const Search = () => {
    const history = useHistory()
    const {q} = useParams<{q: string | undefined}>()
    const [search, setSearch] = useState(q || '')
    const [query, setQuery] = useState(search)
    
    const handleUpdateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value
        setSearch(search)
        history.push(`/search/${search}`)

        if(timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            if(search.trim())
                setQuery(search)
        },2000)
    }

    return(
        <Page>
            <Container>
                <Label>
                    <SearchIcon/>
                    <Input
                        value={search}
                        onChange={handleUpdateSearch}
                        placeholder="Procurar por músicas, albuns, playlists..."
                    />
                </Label>
                <Main>
                    {
                        query ? 
                        <>
                            <SearchTracks query={query}/>
                        </> :
                        <>
                            <h3>Pesquise para ver os resultados</h3>
                        </>
                    }
                </Main>
            </Container>
        </Page>
    )
}

const Main = styled.main`
    padding: ${metrics.spacing4} 0 0 0;
`

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

export default Search