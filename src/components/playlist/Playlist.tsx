import React from 'react'
import styled from 'styled-components'
import HeaderPlaylist from './headerPlaylist/HeaderPlaylist'
import PlaylistTracks from './tablePlaylist/PlaylistTracks'
import ContextPlaylist from './ContextPlaylist'
import usePlaylist from '../../common/hooks/components/playlist/usePlaylist'

const Playlist = () => {
    const values = usePlaylist()

    return( 
        <ContextPlaylist.Provider value={values}>
            <WrapperComponent>
                {
                    values.playlist || values.fakePlaylist ?
                    <>
                        <HeaderPlaylist/> 
                        <PlaylistTracks/>
                    </>
                    : <></>
                }
            </WrapperComponent>
        </ContextPlaylist.Provider>
    )
}

export default Playlist

const WrapperComponent = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
`