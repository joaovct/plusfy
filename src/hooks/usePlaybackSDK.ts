import {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Itoken } from '../store/token/types'
import { Istore } from '../store/types'
import useScript from './useScript'

const usePlaybackSDK = () => {
    useScript('https://sdk.scdn.co/spotify-player.js')
    const {accessToken} = useSelector<Istore, Itoken>(store => store.token)

    useEffect(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new Spotify.Player({
                name: 'Plusfy',
                getOAuthToken: ( callback: Function ) => { callback(accessToken) }
            })

            player.addListener('initialization_error', ({ message }: {message: string}) => { console.error(message); });
            player.addListener('authentication_error', ({ message }: {message: string}) => { console.error(message); });
            player.addListener('account_error', ({ message }: {message: string}) => { console.error(message); });
            player.addListener('playback_error', ({ message }: {message: string}) => { console.error(message); });

            player.addListener('ready', ({ device_id }: {device_id: string}) => {
                // console.log('Ready with Device ID', device_id);
            });

            // Connect to the player!
            player.connect();
        }
    },[accessToken])
}

export default usePlaybackSDK