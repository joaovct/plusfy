import {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Itoken } from '../store/token/types'
import { Istore } from '../store/types'
import useScript from './useScript'
let Spotify: any

declare global {
    interface Window {
        onSpotifyWebPlaybackSDKReady: Function
    }
    class Spotify {
        Player: string
    }
}

const usePlaybackSDK = () => {
    useScript('https://sdk.scdn.co/spotify-player.js')
    const {accessToken} = useSelector<Istore, Itoken>(store => store.token)
    

    useEffect(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            if(Spotify){
                const player = new Spotify.Player({
                    name: 'Plusfy',
                    getOAuthToken: ( callback: Function ) => { callback(accessToken) }
                })
    
                // Error handling
                player.addListener('initialization_error', ({ message }: {message: string}) => { console.error(message); });
                player.addListener('authentication_error', ({ message }: {message: string}) => { console.error(message); });
                player.addListener('account_error', ({ message }: {message: string}) => { console.error(message); });
                player.addListener('playback_error', ({ message }: {message: string}) => { console.error(message); });
    
    
                // Ready
                player.addListener('ready', ({ device_id }: {device_id: string}) => {
                    console.log('Ready with Device ID', device_id);
                });
    
                // Not Ready
                player.addListener('not_ready', ({ device_id }: {device_id: string}) => {
                    console.log('Device ID has gone offline', device_id);
                });
    
                // Connect to the player!
                player.connect();
            }
        }
    },[accessToken])
}

export default usePlaybackSDK

window.onSpotifyWebPlaybackSDKReady = () => {
    
}