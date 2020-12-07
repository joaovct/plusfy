import React, { useState } from 'react'
import { Page, Container as container, Input as input, metrics, Text} from '../../styles/style'
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
                <Main emptyQuery={query ? false : true}>
                    {
                        search && query ? 
                        <>
                            <SearchTracks query={query}/>
                        </> :
                        <>
                            <EmptySearchMessage>
                                <SearchIcon/>
                                <Text>Busque por músicas, albuns, playlists...</Text>
                            </EmptySearchMessage>
                        </>
                    }
                </Main>
            </Container>
        </Page>
    )
}

const EmptySearchMessage = styled.div`
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    margin: ${metrics.spacing3} 0 0 0;
    opacity: .9;

    svg{
        height: 55px;
        width: 55px;
    }
    ${Text}{
        text-align: center;
        max-width: 600px;
    }
`

const Main = styled.main<{emptyQuery: boolean}>`
    flex: 1 1 auto;
    display: flex;
    flex-flow: column nowrap;
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

const Container = styled(container)`
    flex: 1 1 auto;
    display: flex;
    flex-flow: column nowrap;
`

export default Search