import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ISpotifyPlayer } from '../../store/spotifyPlayer/types';
import { IStore } from '../../store/types';
import { disconnectUser, isUserConnected } from '../../utils/userAccess';

const Logoff: React.FC = () => {
    const spotifyPlayer = useSelector<IStore, ISpotifyPlayer>(store => store.spotifyPlayer)

    useEffect(() => {
        if(spotifyPlayer && spotifyPlayer.disconnect){
            spotifyPlayer.disconnect()
        }
    },[spotifyPlayer])

    disconnectUser()
    const response = isUserConnected()


    return response.connected
        ? <Redirect to="/home" />
        : <Redirect to="/" />
}

export default Logoff