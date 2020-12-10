import React, { useState } from 'react'
import styled from 'styled-components'
import { UserTopArtistsAndTracksTimeRange } from '../../common/api/webapi/types'
import { breakpoints, colors, Container, Page } from '../../styles/style'
import FavoriteArtists from './favoriteArtists/FavoriteArtists'
import FavoriteTracks from './favoriteTracks/FavoriteTracks'
import { ListsWrapper } from './style'

const Favorites = () => {
    const [timeRange, setTimeRange] = useState<UserTopArtistsAndTracksTimeRange>('long_term')

    return(
        <Page>
            <Container>
                <Tabs>
                    <Tab active={timeRange === 'long_term'}>
                        <button onClick={() => setTimeRange('long_term')}>
                            Todo tempo
                        </button>
                    </Tab>
                    <Tab active={timeRange === 'medium_term'}>
                        <button onClick={() => setTimeRange('medium_term')}>
                            Últimos 6 meses
                        </button>
                    </Tab>
                    <Tab active={timeRange === 'short_term'}>
                        <button onClick={() => setTimeRange('short_term')}>
                            Último mês
                        </button>
                    </Tab>
                </Tabs>
                <Main>
                    <ListsWrapper>
                        <FavoriteArtists timeRange={timeRange}/>
                        <FavoriteTracks timeRange={timeRange}/>
                    </ListsWrapper>
                </Main>
            </Container>
        </Page>
    )
}

const Main = styled.main`
    width: 100%;
`

const Tab = styled.li<{active?: boolean}>`
    margin: 0 5px;
    transition: background .25s;
    border-radius: 8px;

    ${({active}) => {
        if(active === true)
            return`
                background: ${colors.darkerBackground};
            ` 
        return ''
    }}

    button{
        font-style: normal;
        font-size: 15px;
        font-weight: 600;
        padding: 8px 16px;
        background: rgba(0,0,0,0);
        cursor: pointer;
    }

    @media(max-width: ${breakpoints.tbp}){
        margin: 0 0;
        display: inline-flex;
        align-items: center;
        
        button{
            font-size: 13px;
            padding: 8px 12px;
        }
    }

    @media(max-width: ${breakpoints.sml}){
        button{
            padding-left: 8px;
            padding-right: 8px;
        }
    }
`

const Tabs = styled.ul`
    display: flex;
    flex-flow: row nowrap;

    @media(max-width: ${breakpoints.tbl}){
        justify-content: center;
    }
`

export default Favorites