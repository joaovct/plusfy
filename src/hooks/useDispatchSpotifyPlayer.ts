import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../actions/actions'
import { Itoken } from '../store/token/types'
import { Istore } from '../store/types'
import useScript from './useScript'

const usePlaybackSDK = () => {
    useScript('https://sdk.scdn.co/spotify-player.js')
    const {accessToken} = useSelector<Istore, Itoken>(store => store.token)
    const dispatch = useDispatch()

    useEffect(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const spotifyPlayer = new Spotify.Player({
                name: 'Plusfy',
                getOAuthToken: ( callback: Function ) => { callback(accessToken) }
            })

            spotifyPlayer.connect()
            spotifyPlayer.addListener('ready', () => {
                spotifyPlayer.on('initialization_error', ({ message }) => console.error('Failed to initialize', message))
                spotifyPlayer.on('authentication_error', ({ message }) => console.error('Failed to authenticate', message))
                spotifyPlayer.on('account_error', ({ message }) => console.error('Failed to validate Spotify account', message))
                spotifyPlayer.on('playback_error', ({ message }) => console.error('Failed to perform playback', message))

                dispatch(actions.spotifyPlayerAction(spotifyPlayer))
            })
        }
    },[accessToken, dispatch])
}

export default usePlaybackSDK